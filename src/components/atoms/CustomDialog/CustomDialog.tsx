'use client';
import { Dialog } from '@mui/material';
import React from 'react';
import { ICustomDialogProps } from './CustomDialog.types';

const CustomDialog: React.FC<ICustomDialogProps> = ({
  open,
  maxWidth,
  onClose,
  width,
  height,
  children,
}) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: width, height: height },
      }}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
