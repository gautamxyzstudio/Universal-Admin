import React, { useMemo } from 'react';
import {
  getDialogAttributes,
  IConfirmationDialogProps,
} from './ConfirmationDialog.types';
import CustomDialog from '@/components/atoms/CustomDialog/CustomDialog';
import Image from 'next/image';
import { STRINGS } from '@/constant/en';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  type,
  onPressLogout,
  onClose,
  open,
}) => {
  const dialogAttributes = getDialogAttributes(type);
  const buttonStyles = useMemo(() => {
    return {
      width: 156,
      height: 36,
      borderRadius: 40,
    };
  }, []);
  return (
    <CustomDialog width={348} open={open} onClose={onClose}>
      <div className="p-6 flex flex-col items-center">
        <Image src={dialogAttributes.icon} alt="logo" />
        <div className="mt-4">
          {type === 'logout' && (
            <p className="text-center">{STRINGS.logout_message}</p>
          )}
        </div>
        <div className="mt-3" />
        <CustomButton
          customStyles={buttonStyles}
          variant="outlined"
          title={STRINGS.logout}
          onClick={onPressLogout}
          buttonType={'outline-small-red'}
        />
      </div>
    </CustomDialog>
  );
};

export default ConfirmationDialog;
