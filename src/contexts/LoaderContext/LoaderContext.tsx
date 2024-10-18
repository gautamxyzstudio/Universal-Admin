'use client';
import { createContext } from 'react';
import {
  ILoaderContext,
  ILoaderContextProviderProps,
} from './LoaderContext.types';
import React from 'react';
import FullScreenLoader from '@/components/organism/FullScreenLoader/FullScreenLoader';

const loaderContext = createContext<ILoaderContext | null>(null);

const LoaderContextProvider: React.FC<ILoaderContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleLoader = (value: boolean) => {
    setIsLoading(value);
  };

  const contextValue: ILoaderContext = {
    changeLoaderState: toggleLoader,
  };

  return (
    <loaderContext.Provider value={contextValue}>
      {children}
      {isLoading && <FullScreenLoader />}
    </loaderContext.Provider>
  );
};

export default LoaderContextProvider;

export const useShowLoaderContext = () => {
  const context = React.useContext(loaderContext);
  if (!context) {
    throw new Error(
      'loaderContext must be used within a loaderContextProvider'
    );
  }
  return context;
};
