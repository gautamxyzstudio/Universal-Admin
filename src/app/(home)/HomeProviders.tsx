import LoaderContextProvider from '@/contexts/LoaderContext/LoaderContext';
import SubAdminContextProvider from '@/contexts/SubAdminContext/SubAdminContext';
import MaterialThemeProvider from '@/providers/MaterialThemeProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import SnackBarProvider from '@/providers/SnackbarProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from 'react';

const HomeProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <MaterialThemeProvider>
        <SnackBarProvider>
          <ReduxProvider>
            <LoaderContextProvider>
              <SubAdminContextProvider>{children}</SubAdminContextProvider>
            </LoaderContextProvider>
          </ReduxProvider>
        </SnackBarProvider>
      </MaterialThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default HomeProviders;
