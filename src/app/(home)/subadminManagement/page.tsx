'use client';
import DataTable from '@/components/atoms/DataTable/DataTable';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddSubAdminForm from '@/components/templates/AddSubAdminForm/AddSubAdminForm';
import { addNewSubAdminData } from '@/components/templates/AddSubAdminForm/AddSubAdminForm.types';
import { STRINGS } from '@/constant/en';
import React, { useState } from 'react';
import { subAdminDataColumn } from './types';
import { Images } from '../../../../public/exporter';
import { useGetSubAdminsQuery } from '@/api/fetures/SubAdmin/SubAdminApi';

const SubAdminManagement = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const { error, isLoading, data } = useGetSubAdminsQuery(null);
  const onPressPrimaryButton = () => {
    setShowFormModal(true);
  };

  return (
    <div className="w-full h-[85%] mb-5 ">
      <PageHeader
        primaryButtonTitle={STRINGS.addSubAdmin}
        title={STRINGS.subAdminManagement}
        onPressPrimaryButton={onPressPrimaryButton}
      />
      <DataTable
        isLoading={isLoading}
        columns={subAdminDataColumn}
        rows={data}
        emptyViewTitle={STRINGS.noSubAdmin}
        emptyViewSubTitle={STRINGS.noSubAdminDec}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={data && data?.length === 0}
      />
      <AddSubAdminForm
        setGlobalModalState={(state) => setShowFormModal(state)}
        data={addNewSubAdminData}
        show={showFormModal}
      />
    </div>
  );
};

export default SubAdminManagement;
