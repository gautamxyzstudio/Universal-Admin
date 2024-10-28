'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import { useLazyGetClientsQuery } from '@/api/fetures/Client/ClientApi';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddCompanyList from '@/components/templates/AddCompanyList/AddCompanyList';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';

const ClientManagement = () => {
  const [listData, setListData] = useState(false);
  const [clients, setClients] = useState<IClient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);
  const [getClients, { isLoading, error }] = useLazyGetClientsQuery();

  const getClientsHandler = async (isFirstPage?: boolean) => {
    const page = isFirstPage ? 1 : currentPage + 1;
    try {
      const clientResponse = await getClients({ page }).unwrap();
      if (clientResponse) {
        setClients(clientResponse.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getClientsHandler(true);
  }, []);

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        title={STRINGS.clientManagement}
        withSecondaryButton
        secondaryButtonTitle={STRINGS.pendingReq + ' (48)'}
        onPressButton={() => setListData(true)}
      />
      <AddCompanyList show={listData} handleClose={undefined} onPressCross={()=>setListData(false)} />
    </div>
  );
};

export default ClientManagement;
