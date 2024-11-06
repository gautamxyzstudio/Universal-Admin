import { Drawer } from '@mui/material';
import React from 'react';
import { ICustomDrawerProps } from './CustomDrawer.types';

const CustomDrawer: React.FC<ICustomDrawerProps> = ({
  open,
  onClose,
  children,
  styles,
}) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          borderRadius: '8px 0 0 8px',
          ...styles,
        },
      }}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
