import LoaderContextProvider from '@/contexts/LoaderContext/LoaderContext';
import MaterialThemeProvider from '@/providers/MaterialThemeProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import SnackBarProvider from '@/providers/SnackbarProvider';
import React from 'react';

const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaterialThemeProvider>
      <ReduxProvider>
        <SnackBarProvider>
          <LoaderContextProvider>{children}</LoaderContextProvider>
        </SnackBarProvider>
      </ReduxProvider>
    </MaterialThemeProvider>
  );
};

export default AuthProviders;
