/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAddNewSubAdminMutation } from '@/api/fetures/SubAdmin/SubAdminApi';
import { IAddNewSubAdminRequest } from '@/api/fetures/SubAdmin/SubAdminApi.types';
import React from 'react';
import { createContext } from 'react';
import { ISubAdminContext } from './SubAdminContext.types';
import { useShowLoaderContext } from '../LoaderContext/LoaderContext';

export const SubAdminContext = createContext<ISubAdminContext | null>(null);

const SubAdminContextProvider = ({ children }) => {
  const [addNewSubAdmin, { isLoading, error, data }] =
    useAddNewSubAdminMutation();

  const { changeLoaderState } = useShowLoaderContext();

  const addSubAdminHandler = async (params: IAddNewSubAdminRequest) => {
    try {
      changeLoaderState(true);
      const createSubAdminResponse = await addNewSubAdmin(params).unwrap();
      if (createSubAdminResponse) {
        console.log(createSubAdminResponse, 'Api REst');
      }
    } catch (err) {
      console.log(err);
    } finally {
      changeLoaderState(false);
    }
  };

  const contextValue: ISubAdminContext = {
    addSubAdmin: addSubAdminHandler,
    addSubAdminState: {
      isLoading,
      data: data ?? null,
      error,
    },
  };

  return (
    <SubAdminContext.Provider value={contextValue}>
      {children}
    </SubAdminContext.Provider>
  );
};

export default SubAdminContextProvider;

export const useSubAdminContext = () => {
  const context = React.useContext(SubAdminContext);
  if (!context) {
    throw new Error(
      'useSubAdminContext must be used within a SubAdminContextProvider'
    );
  }
  return context;
};
