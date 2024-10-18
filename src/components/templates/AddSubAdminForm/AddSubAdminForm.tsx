'use client';
import AddNewForm from '@/components/organism/AddNewForm/AddNewForm';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import {
  IAddNewSubAdminFields,
  IAddSubAdminFormProps,
} from './AddSubAdminForm.types';
import { useSubAdminContext } from '@/contexts/SubAdminContext/SubAdminContext';
import { generateUniqueUserName } from '@/utility/utils';

const AddSubAdminForm: React.FC<IAddSubAdminFormProps> = ({
  show,
  data,
  setGlobalModalState,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const { addSubAdmin } = useSubAdminContext();

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  const onSubmit = (data: { [key: string]: string }) => {
    const dataWithType = data as IAddNewSubAdminFields;
    setDisplayFrom(false);
    setGlobalModalState(false);
    addSubAdmin({
      email: dataWithType.email,
      password: dataWithType.password,
      phoneNumber: dataWithType.phoneNumber,
      UserStatus: dataWithType.status === 'true',
      user_type: 'subAdmin',
      UserNameFL: `${dataWithType.firstName} ${dataWithType.lastName}`,
      username: generateUniqueUserName(dataWithType.email),
    });
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
