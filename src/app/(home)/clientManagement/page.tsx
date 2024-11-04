'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import {
  useLazyGetClientsQuery,
  useRegisterClientMutation,
} from '@/api/fetures/Client/ClientApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import ContactDetails from '@/components/molecules/ContactDetails/ContactDetails';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Images } from '../../../../public/exporter';
import { getClientStatusAttributesFromType } from './types';
import { useRouter } from 'next/navigation';
import { routeNames } from '@/utility/routesName';
import AddCompanyList from '@/components/templates/AddCompanyList/AddCompanyList';
import LinkOrAddClientFrom from '@/components/templates/LinkOrAddClientForm/LinkOrAddClientForm';
import { ICompany } from '@/api/fetures/Company/Company.types';
import { IAddEmployeeClientArgs } from './[pendingRequests]/types';
import { generateUniqueUserName } from '@/utility/utils';

const ClientManagement = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const router = useRouter();
  const [registerClient] = useRegisterClientMutation();
  const [addClientModal, setAddClientModal] = useState(false);
  const [isLastPage, setIsLastPage] = useState(true);
  const [getClients, { isFetching, error }] = useLazyGetClientsQuery();

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

  const onSelectCompany = (company) => {
    setShowCompanyList(false);
    setSelectedCompany(company);
  };

  const modalStateChangeHandler = (state) => {
    setAddClientModal(state);
  };

  const addClientHandler = async (details: {
    company: ICompany | null;
    client: IAddEmployeeClientArgs;
  }) => {
    try {
      const isRegisteredClient = await registerNewClient({
        email: details.client.email,
        password: details.client.password,
      });
    } catch (error) {}
  };

  const registerNewClient = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const registerClientRes = await registerClient({
        email: email,
        password: password,
        user_type: 'client',
        role: 'ClientUser',
        username: generateUniqueUserName(email),
      }).unwrap();
      if (registerClientRes) {
        console.log(registerClientRes);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        title={STRINGS.clientManagement}
        withSecondaryButton
        withPrimaryButton
        primaryButtonTitle={STRINGS.addClient}
        onPressSecondaryButton={() => router.push(routeNames.PendingRequests)}
        secondaryButtonTitle={STRINGS.pendingReq + ' (48)'}
        onPressButton={() => setAddClientModal(true)}
      />
      <DataTable
        columns={columns}
        rows={clients}
        isLoading={isFetching}
        emptyViewTitle={STRINGS.noClients}
        emptyViewSubTitle={STRINGS.noClientDec}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={clients.length === 0}
      />
      <AddCompanyList
        show={showCompanyList}
        setGlobalModalState={(state) => setShowCompanyList(state)}
        onSelectCompany={onSelectCompany}
      />
      <LinkOrAddClientFrom
        selectedCompany={selectedCompany}
        show={addClientModal}
        type="add"
        setGlobalModalState={modalStateChangeHandler}
        selectedClient={null}
        onPressLink={() => setShowCompanyList(true)}
        onDeselectCompany={() => setSelectedCompany(null)}
        onPressAddEmployee={addClientHandler}
      />
    </div>
  );
};

export default ClientManagement;
