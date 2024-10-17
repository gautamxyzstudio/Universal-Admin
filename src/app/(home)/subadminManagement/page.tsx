'use client';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddSubAdminForm from '@/components/templates/AddSubAdminForm/AddSubAdminForm';
import { addNewSubAdminData } from '@/components/templates/AddSubAdminForm/AddSubAdminForm.types';
import { STRINGS } from '@/constant/en';
import React, { useState } from 'react';

const SubAdminManagement = () => {
  const [showFormModal, setShowFormModal] = useState(false);

  const onPressPrimaryButton = () => {
    setShowFormModal(true);
  };

  return (
    <div className="items-center justify-items-center min-h-screen bg-">
      <PageHeader
        primaryButtonTitle={STRINGS.addSubAdmin}
        title={STRINGS.subAdminManagement}
        onPressPrimaryButton={onPressPrimaryButton}
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
