'use client';
import AddNewForm from '@/components/organism/AddNewForm/AddNewForm';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import {
  createPayloadFromUpdateProperties,
  IAddNewSubAdminFields,
  IAddSubAdminFormProps,
} from './AddSubAdminForm.types';
import { useSubAdminContext } from '@/contexts/SubAdminContext/SubAdminContext';
import {
  findDifferenceBetweenObject,
  generateUniqueUserName,
} from '@/utility/utils';
import { ISubAdmin } from '@/api/fetures/SubAdmin/SubAdminApi.types';
import { extractFirstAndLastNameFromName } from '@/utility/cookies';
import { useSnackBarContext } from '@/providers/SnackbarProvider';

const AddSubAdminForm: React.FC<IAddSubAdminFormProps> = ({
  show,
  subAdmin,
  data,
  setGlobalModalState,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const [isValid, setIsValid] = useState(false);
  const { addSubAdmin, updateSubAdmin } = useSubAdminContext();
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<ISubAdmin | null>(
    null
  );
  const { displaySnackbar } = useSnackBarContext();

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  useEffect(() => {
    setSelectedSubAdmin(subAdmin);
  }, [subAdmin]);

  const onSubmit = (data: { [key: string]: string }) => {
    const dataWithType = data as IAddNewSubAdminFields;

    if (selectedSubAdmin) {
      const keysToUpdate = findDifferenceBetweenObject(
        {
          firstName: extractFirstAndLastNameFromName(
            selectedSubAdmin.UserNameFL
          ).firstName,
          lastName: extractFirstAndLastNameFromName(selectedSubAdmin.UserNameFL)
            .lastName,
          phoneNumber: selectedSubAdmin.phoneNumber,
          status: selectedSubAdmin.UserStatus ? 'true' : 'false',
        },
        data
      );
      const payload = createPayloadFromUpdateProperties(
        keysToUpdate,
        selectedSubAdmin
      );
      if (payload) {
        setDisplayFrom(false);
        setIsValid(true);
        setGlobalModalState(false);
        updateSubAdmin({
          subAdminId: payload?.subAdminId,
          data: payload?.body,
        });
        setTimeout(() => {
          setIsValid(false);
        }, 300);
      } else {
        displaySnackbar('error', STRINGS.noUpdate);
      }
    } else {
      setDisplayFrom(false);
      setIsValid(true);
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
      setTimeout(() => {
        setIsValid(false);
      }, 300);
    }
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
      buttonTitle={selectedSubAdmin ? STRINGS.update : STRINGS.create}
      data={data}
      isValid={isValid}
      title={selectedSubAdmin ? STRINGS.updateSubAdmin : STRINGS.addSubAdmin}
      open={displayFrom}
      handleClose={handleClickOutside}
      onPressSubmit={(data) => onSubmit(data)}
      onPressCross={onPressCross}
    />
  );
};

export default AddSubAdminForm;
