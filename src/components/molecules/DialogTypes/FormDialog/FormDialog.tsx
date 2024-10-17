import CustomDialog from '@/components/atoms/CustomDialog/CustomDialog';
import React from 'react';
import { IFormDialogProps } from './FormDialog.types';
import Image from 'next/image';
import { Icons } from '../../../../../public/exporter';

const FormDialog: React.FC<IFormDialogProps> = ({
  open,
  handleClose,
  title,
  children,
  onPressCross,
}) => {
  return (
    <CustomDialog width={452} open={open} onClose={handleClose}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-textBlack">{title}</h1>
        <Image
          alt=""
          className="absolute cursor-pointer top-2 right-2 z-10"
          onClick={onPressCross}
          src={Icons.crossDialog}
        />
        {children}
      </div>
    </CustomDialog>
  );
};

export default FormDialog;
