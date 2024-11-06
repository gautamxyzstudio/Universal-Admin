/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ICompany } from '@/api/fetures/Company/Company.types';
import { useGetCompanyQuery } from '@/api/fetures/Company/CompanyApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddCompanyForm from '@/components/templates/AddCompanyForm/AddCompanyForm';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';

const Company = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);
  const { data, isLoading, error } = useGetCompanyQuery({
    page: 1,
    search: '',
    perPage: 100,
  });
  const [showFormModal, setShowFormModal] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    if (data) {
      if (data.meta.pagination.page === 1) {
        setCompanies(data?.data);
      } else {
        setCompanies((prev) => [...prev, ...data?.data]);
      }
      setIsLastPage(
        data?.data.length === 0 ||
          currentPage === data?.meta.pagination.pageCount
      );
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      headerName: 'S.no',

      width: 48,
      field: 'sNum',
    },
    {
      headerName: 'Company Name',
      width: 240,
      field: 'companyname',
      renderCell: useCallback(
        (params) => (
          <UserNameWithImage
            imageStyle="!w-10 !h-10"
            image={params?.row?.companylogo}
            name={params?.row?.companyname ?? ''}
            type={'white'}
          />
        ),
        []
      ),
    },
    {
      headerName: 'E-mail',
      width: 240,
      field: 'companyemail',
    },
    {
      headerName: 'Co. registered number',
      width: 220,
      field: 'regNo',
    },
    {
      headerName: 'Account creation',
      width: 220,
      field: 'location',
    },
    {
      headerName: 'Action',
      width: 80,
      field: '',
      renderCell: useCallback(
        () => <h1 className="text-sm cursor-pointer text-primary">View</h1>,
        []
      ),
    },
  ];

  const onReachEnd = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const companyAddHandler = (comp: ICompany) => {
    setCompanies((prev) => {
      return [...prev, comp];
    });
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        withPrimaryButton
        primaryButtonTitle={STRINGS.addCompany}
        onPressButton={() => setShowFormModal(true)}
        title={STRINGS.company}
      />
      <DataTable
        columns={columns}
        rows={companies}
        isLoading={isLoading}
        onReachEnd={onReachEnd}
        emptyViewTitle={''}
        emptyViewSubTitle={''}
        illustration={undefined}
        error={error}
        isDataEmpty={companies.length === 0}
      />
      <AddCompanyForm
        show={showFormModal}
        setGlobalModalState={(state) => setShowFormModal(state)}
        onAddCompanyHandler={companyAddHandler}
      />
    </div>
  );
};

export default Company;
