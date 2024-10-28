'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import { useLazyGetClientsQuery } from '@/api/fetures/Client/ClientApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import ContactDetails from '@/components/molecules/ContactDetails/ContactDetails';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Images } from '../../../../public/exporter';
import { getClientStatusAttributesFromType } from './types';

const ClientManagement = () => {
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

  const columns: GridColDef[] = [
    {
      field: 'joiningDate',
      headerName: STRINGS.joiningDate,
      width: 100,
      renderCell: (params) =>
        new Date(params.row.joiningDate).toLocaleDateString(),
    },
    {
      field: 'clientDetails',
      headerName: STRINGS.clientNameAndComp,
      width: 256,
      renderCell: (params) => (
        <UserNameWithImage
          type={'white'}
          imageStyle="!w-8 !h-8"
          divStyle="gap-y-0"
          name={params.row.name}
          image={params.row.selfie}
          companyNameStyle=" text-disable "
          companyName={params.row.companyName}
        />
      ),
    },
    {
      field: 'contactDetails',
      headerName: STRINGS.contactDetails,
      width: 256,
      renderCell: (params) => (
        <ContactDetails phone={params.row.phone} email={params.row.email} />
      ),
    },
    {
      field: 'location',
      headerName: STRINGS.location,
      width: 180,
    },
    {
      field: 'status',
      headerName: STRINGS.status,
      width: 180,
      renderCell: (params) => {
        const attributes = getClientStatusAttributesFromType(params.row.status);
        return <span className={attributes.styles}>{attributes.text}</span>;
      },
    },
    {
      field: STRINGS.action,
      headerName: 'Action',
      width: 104,
      renderCell: () => <span className="text-primary">{STRINGS.view}</span>,
    },
  ];

  useEffect(() => {
    getClientsHandler(true);
  }, []);

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        title={STRINGS.clientManagement}
        withSecondaryButton
        withPrimaryButton
        primaryButtonTitle={STRINGS.addClient}
        secondaryButtonTitle={STRINGS.pendingReq + ' (48)'}
        onPressButton={() => console.log('heloow roled')}
      />
      <DataTable
        columns={columns}
        rows={clients}
        isLoading={isLoading}
        emptyViewTitle={STRINGS.noClients}
        emptyViewSubTitle={STRINGS.noClientDec}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={clients.length === 0}
      />
    </div>
  );
};

export default ClientManagement;
