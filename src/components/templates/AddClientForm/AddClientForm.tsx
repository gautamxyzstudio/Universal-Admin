'use client';
import AddNewForm from '@/components/organism/AddNewForm/AddNewForm';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import { IAddClientForm, IAddNewClientDataFields } from './AddClientForm.types';

const AddClientForm: React.FC<IAddClientForm> = ({
  show,
  setGlobalModalState,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

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

  const onSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };

  const onPressCross = () => {
    setDisplayFrom(false);
    setGlobalModalState(false);
  };
  return (
    <AddNewForm
      buttonTitle={STRINGS.create}
      data={IAddNewClientDataFields}
      isValid={true}
      title={STRINGS.addClient}
      open={displayFrom}
      handleClose={handleClickOutside}
      onPressSubmit={(data) => onSubmit(data)}
      onPressCross={onPressCross}
    />
  );
};

export default AddClientForm;
