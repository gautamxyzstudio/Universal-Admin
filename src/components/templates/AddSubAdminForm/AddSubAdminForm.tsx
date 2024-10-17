'use client';
import AddNewForm from '@/components/organism/AddNewForm/AddNewForm';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import { IAddSubAdminFormProps } from './AddSubAdminForm.types';

const AddSubAdminForm: React.FC<IAddSubAdminFormProps> = ({
  show,
  data,
  setGlobalModalState,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  const onSubmit = (data: { [key: string]: any }) => {
    setDisplayFrom(false);
    setGlobalModalState(false);
    console.log(data);
  };

  const handleClickOutside = (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason == 'backdropClick') {
      return;
    }
    setDisplayFrom(false);
    setGlobalModalState(false);
  };

  const onPressCross = () => {
    setDisplayFrom(false);
    setGlobalModalState(false);
  };
  return (
    <AddNewForm
      data={data}
      title={STRINGS.addSubAdmin}
      open={displayFrom}
      handleClose={handleClickOutside}
      onPressSubmit={(data) => onSubmit(data)}
      onPressCross={onPressCross}
    />
  );
};

export default AddSubAdminForm;
