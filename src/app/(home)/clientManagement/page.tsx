'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import {
  useAddClientDetailsMutation,
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
import { ICustomErrorResponse } from '@/api/types';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { IClientStatus } from '@/constant/enums';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';

const ClientManagement = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const router = useRouter();
  const [registerClient] = useRegisterClientMutation();
  const [addClientDetails] = useAddClientDetailsMutation();
  const { changeLoaderState } = useShowLoaderContext();
  const { displaySnackbar } = useSnackBarContext();
  const [addClientModal, setAddClientModal] = useState(false);
  // const [isLastPage, setIsLastPage] = useState(true);
  const [getClients, { isFetching, error }] = useLazyGetClientsQuery();

  //====================================================Apis start====================
  //get Clients list
  const getClientsHandler = async () => {
    const page = 1;
    try {
      const clientResponse = await getClients({ page }).unwrap();
      if (clientResponse) {
        setClients(clientResponse.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // register new client user
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
        return registerClientRes.clientId;
      }
    } catch (err) {
      throw err;
    }
  };

  //Add registered client details
  const addRegisteredClientDetails = async (
    userId: number,
    client: IAddEmployeeClientArgs,
    companyId: number
  ) => {
    try {
      const addClientDetailsResp = await addClientDetails({
        data: {
          Name: client.name,
          companyname: client.compName,
          contactno: client.phone,
          Industry: client.industry,
          Email: client.email,
          location: client.location,
          jobs: [],
          company_detail: companyId,
          clien_id: userId,
          status: IClientStatus.ACTIVE,
        },
      }).unwrap();
      if (addClientDetailsResp) {
        return addClientDetailsResp;
      }
    } catch (error) {
      throw error;
    }
  };

  //====================================================Apis end====================

  // Add new client function
  const addClientHandler = async (details: {
    company: ICompany | null;
    client: IAddEmployeeClientArgs;
  }) => {
    try {
      modalStateChangeHandler(false);
      changeLoaderState(true);
      const registeredClientResponse = await registerNewClient({
        email: details.client.email,
        password: details.client.password,
      });
      if (registeredClientResponse && details?.company?.id) {
        const clientDetails = await addRegisteredClientDetails(
          registeredClientResponse,
          details.client,
          details.company?.id
        );
        if (clientDetails) {
          displaySnackbar('success', STRINGS.clientAdded);
          const newClient: IClient[] = [
            {
              id: clientDetails.data.id,
              name: clientDetails.data.attributes?.Name ?? '',
              status:
                clientDetails.data.attributes?.status ?? IClientStatus.ACTIVE,
              email: clientDetails.data.attributes?.Email ?? '',
              phone: clientDetails.data.attributes?.contactno ?? '',
              detailsId: clientDetails.data.id,
              joiningDate: new Date(),
              location: clientDetails.data.attributes?.location ?? '',
              selfie: '',
              company: {
                id: details.company.id,
                companyname: details.company.companyname ?? '',
                companyemail: details.company.companyemail ?? '',
                companylogo: details.company.companylogo ?? '',
              },
              companyName: clientDetails.data.attributes?.companyname ?? '',
              industry: clientDetails.data.attributes?.Industry ?? '',
            },
          ];
          setClients((prev) => [...newClient, ...prev]);
        }
      }
    } catch (error) {
      const customError = error as ICustomErrorResponse;
      displaySnackbar('error', customError.message);
    } finally {
      changeLoaderState(false);
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
      renderCell: (params: { row: IClient }) => (
        <UserNameWithImage
          type={'white'}
          imageStyle="!w-8 !h-8"
          divStyle="gap-y-0"
          name={params.row.name ?? ''}
          image={params.row.company?.companylogo}
          companyNameStyle=" text-disable "
          companyName={
            params.row.company?.companyname ?? params.row.companyName
          }
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
    getClientsHandler();
  }, []);

  const onSelectCompany = (company) => {
    setShowCompanyList(false);
    setSelectedCompany(company);
  };

  const modalStateChangeHandler = (state) => {
    setAddClientModal(state);
    if (state === false) {
      setSelectedCompany(null);
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
