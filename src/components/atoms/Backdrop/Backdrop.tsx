import React, { memo } from 'react';
import MaterialBackDrop from '@mui/material/Backdrop';
import { IBackdropProps } from './Backdrop.type';
const Backdrop: React.FC<IBackdropProps> = ({ open, onClose, children }) => {
  return (
    <MaterialBackDrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={onClose}
    >
      {children}
    </MaterialBackDrop>
  );
};

export default memo(Backdrop);
