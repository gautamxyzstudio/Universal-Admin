'use client';
import { IClient } from '@/api/fetures/Client/Client.types';
import { useGetPendingRequestsQuery } from '@/api/fetures/Client/ClientApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import ContactDetails from '@/components/molecules/ContactDetails/ContactDetails';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Images } from '../../../../../public/exporter';
import AddCompanyList from '@/components/templates/AddCompanyList/AddCompanyList';
import { ICompany } from '@/api/fetures/Company/Company.types';
import LinkOrAddClientFrom from '@/components/templates/LinkOrAddClientForm/LinkOrAddClientForm';

const PendingRequests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [verifyClientModal, setVerifyClientModal] = useState(false);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [isLastPage, setIsLastPage] = useState(true);
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
      renderCell: () => (
        <span className="text-green cursor-pointer font-bold ">
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
    console.log(company);
    setShowCompanyList(false);
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
        onPressRow={(row) => handleSelectClient(row as IClient)}
        isLoading={isLoading}
        emptyViewTitle={STRINGS.no_pending}
        emptyViewSubTitle={''}
        error={error}
        isDataEmpty={pendingRequests?.length === 0}
      />
      <AddCompanyList
        show={showCompanyList}
        setGlobalModalState={(state) => setShowCompanyList(state)}
        onSelectCompany={onSelectCompany}
      />
      <LinkOrAddClientFrom
        show={verifyClientModal}
        setGlobalModalState={(state) => setVerifyClientModal(state)}
        selectedClient={selectedClient}
        onPressLink={() => setShowCompanyList(true)}
      />
    </div>
  );
};

export default PendingRequests;
