'use client';
import { ICompany } from '@/api/fetures/Company/Company.types';
import { useGetCompanyQuery } from '@/api/fetures/Company/CompanyApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import { IDynamicFormField } from '@/components/organism/AddNewForm/AddNewForm.types';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddCompanyForm from '@/components/templates/AddCompanyForm/AddCompanyForm';
import { addNewSubAdminData } from '@/components/templates/AddSubAdminForm/AddSubAdminForm.types';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

const Company = () => {
  const { data, isLoading, error } = useGetCompanyQuery(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [form, setFormData] = useState<IDynamicFormField[]>(addNewSubAdminData);

  useEffect(() => {
    setCompanies(data?.data ?? []);
  }, [data]);

  const columns: GridColDef[] = [
    {
      headerName: 's.No',
      width: 48,
      field: 'sNum',
    },
    {
      headerName: 'Company Name',
      width: 240,
      field: 'companyname',
      renderCell: (params) => (
        <UserNameWithImage
          image={params?.row?.companylogo}
          name={params?.row?.companyname ?? ''}
          type={'white'}
        />
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
      renderCell: () => (
        <h1 className="text-sm cursor-pointer text-primary">View</h1>
      ),
    },
  ];

  const companyAddHandler = (comp: ICompany) => {
    setCompanies((prev) => {
      return [...prev, comp];
    });
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        primaryButtonTitle={STRINGS.addCompany}
        onPressPrimaryButton={() => setShowFormModal(true)}
        title={STRINGS.company}
      />
      <DataTable
        columns={columns}
        rows={companies}
        isLoading={isLoading}
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
