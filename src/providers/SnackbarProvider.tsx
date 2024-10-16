'use client';
import CustomSnackbar from '@/components/atoms/Snackbar/Snackbar';
import { SnackbarCloseReason } from '@mui/material';
import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';

type SnackBarContextTypes = {
  displaySnackbar: (
    type: 'success' | 'error' | 'warning',
    message: string
  ) => void;
};

const SnackBarContext = createContext<SnackBarContextTypes | null>(null);

const SnackBarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [open, setState] = useState<boolean>(false);
  const [type, setType] = useState<'success' | 'error' | 'warning'>('success');

  const displaySnackBarHandler = (
    type: 'success' | 'error' | 'warning',
    message: string
  ) => {
    setType(type);
    setState(true);
    setMessage(message);
  };

  const contextValue: SnackBarContextTypes = {
    displaySnackbar: displaySnackBarHandler,
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setState(false);
    setMessage('');
  };

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
      <CustomSnackbar
        type={type}
        message={message}
        open={open}
        handleClose={handleClose}
      />
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;

export const useSnackBarContext = () => {
  const context = React.useContext(SnackBarContext);
  if (!context) {
    throw new Error(
      'useSnackBarContext must be used within a SnackBarContextProvider '
    );
  }
  return context;
};
