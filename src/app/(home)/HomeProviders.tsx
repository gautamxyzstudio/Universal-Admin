import DocumentExpandedViewContextProvider from '@/contexts/DocumentExpandedViewContext/DocumentExpandedViewContext';
import LoaderContextProvider from '@/contexts/LoaderContext/LoaderContext';
import SubAdminContextProvider from '@/contexts/SubAdminContext/SubAdminContext';
import MaterialThemeProvider from '@/providers/MaterialThemeProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import SnackBarProvider from '@/providers/SnackbarProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import NotificationProvider from '../../contexts/NotificationContext/NotificationContext';
import React from 'react';

const HomeProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <SnackBarProvider>
        <NotificationProvider>
          <MaterialThemeProvider>
            <ReduxProvider>
              <LoaderContextProvider>
                <SubAdminContextProvider>
                  <DocumentExpandedViewContextProvider>
                    {children}
                  </DocumentExpandedViewContextProvider>
                </SubAdminContextProvider>
              </LoaderContextProvider>
            </ReduxProvider>
          </MaterialThemeProvider>
        </NotificationProvider>
      </SnackBarProvider>
    </AppRouterCacheProvider>
  );
};

export default HomeProviders;
