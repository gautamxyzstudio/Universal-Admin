'use client';
import { useGetCompanyQuery } from '@/api/fetures/Company/CompanyApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import { IDynamicFormField } from '@/components/organism/AddNewForm/AddNewForm.types';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddCompanyForm from '@/components/templates/AddCompanyForm/AddCompanyForm';
import { addNewSubAdminData } from '@/components/templates/AddSubAdminForm/AddSubAdminForm.types';
import { STRINGS } from '@/constant/en';
import React, { useState } from 'react';

const Company = () => {
  const { data } = useGetCompanyQuery(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [form, setFormData] = useState<IDynamicFormField[]>(addNewSubAdminData);

  console.log(data);

  return (
    <div className="items-center px-10 justify-items-center min-h-screen bg-">
      <PageHeader
        primaryButtonTitle={STRINGS.addCompany}
        onPressPrimaryButton={() => setShowFormModal(true)}
        title={STRINGS.company}
      />
      <DataTable
        columns={[]}
        rows={[]}
        isLoading={false}
        emptyViewTitle={''}
        emptyViewSubTitle={''}
        illustration={undefined}
        error={undefined}
        isDataEmpty={false}
      />
      <AddCompanyForm
        show={showFormModal}
        setGlobalModalState={(state) => setShowFormModal(state)}
        data={form}
      />
    </div>
  );
};

export default Company;
