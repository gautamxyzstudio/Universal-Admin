/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import {
  useGetPendingRequestsQuery,
  useLinkClientMutation,
} from '@/api/fetures/Client/ClientApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import ContactDetails from '@/components/molecules/ContactDetails/ContactDetails';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Images } from '../../../../../public/exporter';
import AddCompanyList from '@/components/templates/AddCompanyList/AddCompanyList';
import LinkOrAddClientFrom from '@/components/templates/LinkOrAddClientForm/LinkOrAddClientForm';
import { ICompany } from '@/api/fetures/Company/Company.types';
import { IClientStatus } from '@/constant/enums';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { ICustomErrorResponse } from '@/api/types';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';

const PendingRequests = () => {
  const [listData, setListData] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [verifyClientModal, setVerifyClientModal] = useState(false);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const { changeLoaderState } = useShowLoaderContext();
  const [linkClientHandler] = useLinkClientMutation();
  const { displaySnackbar } = useSnackBarContext();

  // const [isLastPage, setIsLastPage] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const { data, isLoading, error } = useGetPendingRequestsQuery({
    page: currentPage,
  });
  const [pendingRequests, setPendingRequests] = useState<IClient[]>([]);

  useEffect(() => {
    if (data?.data) {
      setPendingRequests(data.data);
      setCurrentPage(data.pagination.page);
    }
  }, [data]);

  const onPressAddEmployee = async ({
    company,
    client,
  }: {
    company: ICompany | null;
    client: IClient | null;
  }) => {
    if (company && client) {
      modalStateChangeHandler(false);
      try {
        changeLoaderState(true);
        const linkedClientResponse = await linkClientHandler({
          clientDetails: {
            Name: client?.name ?? '',
            companyname: client?.companyName,
            status: IClientStatus.ACTIVE,
            location: client?.location,
            Industry: client.industry,
            company_detail: company.id,
          },
          clientId: client.detailsId,
        }).unwrap();
        if (linkedClientResponse) {
          setPendingRequests((prev) => {
            const prevRequests = [...prev];
            const index = prevRequests.findIndex(
              (req) => req.detailsId === client.detailsId
            );
            prevRequests.splice(index);
            return prevRequests;
          });
          displaySnackbar('success', STRINGS.clientAdded);
        }
      } catch (error) {
        const err = error as ICustomErrorResponse;
        displaySnackbar('error', err.message);
      } finally {
        changeLoaderState(false);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'joiningDate',
      headerName: STRINGS.date,
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
      field: 'industry',
      headerName: STRINGS.industry,
      width: 180,
    },
    {
      field: 'Action',
      headerName: STRINGS.action,
      width: 90,
      renderCell: (params) => (
        <span
          className="text-green cursor-pointer font-bold "
          onClick={() => handleSelectClient(params.row)}
        >
          {STRINGS.verify}
        </span>
      ),
    },
  ];

  const handleSelectClient = (client: IClient) => {
    setSelectedClient(client);
    setVerifyClientModal(true);
  };

  const onSelectCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyList(false);
  };

  const modalStateChangeHandler = (state) => {
    setVerifyClientModal(state);
    if (state === false) {
      setSelectedCompany(null);
      setSelectedClient(null);
    }
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageSubHeader
        pageTitle={STRINGS.clientManagement}
        name={STRINGS.pendingReq}
      />
      <DataTable
        columns={columns}
        illustration={Images.noSubAdmin}
        rows={pendingRequests}
        isLoading={isLoading}
        emptyViewTitle={STRINGS.no_pending}
        emptyViewSubTitle={''}
        error={error}
        isDataEmpty={pendingRequests?.length === 0}
        withPagination={false}
      />
      <AddCompanyList
        show={showCompanyList}
        setGlobalModalState={(state) => setShowCompanyList(state)}
        onSelectCompany={onSelectCompany}
      />
      <LinkOrAddClientFrom
        selectedCompany={selectedCompany}
        show={verifyClientModal}
        type="link"
        setGlobalModalState={modalStateChangeHandler}
        selectedClient={selectedClient}
        onPressLink={() => setShowCompanyList(true)}
        onDeselectCompany={() => setSelectedCompany(null)}
        onPressLinkEmployee={onPressAddEmployee}
      />
    </div>
  );
};

export default PendingRequests;
