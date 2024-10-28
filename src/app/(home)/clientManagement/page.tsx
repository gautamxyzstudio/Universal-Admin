'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import { useLazyGetClientsQuery } from '@/api/fetures/Client/ClientApi';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    getClientsHandler(true);
  }, []);

  return (
    <div className="items-center px-10 justify-items-center min-h-screen bg-">
      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-Black font-bold text-[24px] leading-7">
          {STRINGS.clientManagement}
        </h1>
        <div className="flex items-center gap-x-6"></div>
      </div>
    </div>
  );
};

export default ClientManagement;
