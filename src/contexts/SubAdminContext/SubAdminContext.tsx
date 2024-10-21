/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  useAddNewSubAdminMutation,
  useUpdateSubAdminMutation,
} from '@/api/fetures/SubAdmin/SubAdminApi';
import {
  IAddNewSubAdminRequest,
  ISubAdmin,
} from '@/api/fetures/SubAdmin/SubAdminApi.types';
import React, { useState } from 'react';
import { createContext } from 'react';
import { ISubAdminContext } from './SubAdminContext.types';
import { useShowLoaderContext } from '../LoaderContext/LoaderContext';
import { ICustomErrorResponse } from '@/api/types';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { STRINGS } from '@/constant/en';

export const SubAdminContext = createContext<ISubAdminContext | null>(null);

const SubAdminContextProvider = ({ children }) => {
  const [addNewSubAdmin] = useAddNewSubAdminMutation();
  const [updateSubAdminReq] = useUpdateSubAdminMutation();

  const [subAdmins, setSubAdmins] = useState<ISubAdmin[]>([]);
  const { displaySnackbar } = useSnackBarContext();
  const { changeLoaderState } = useShowLoaderContext();

  const addSubAdminHandler = async (params: IAddNewSubAdminRequest) => {
    try {
      changeLoaderState(true);
      const createSubAdminResponse = await addNewSubAdmin(params).unwrap();
      if (createSubAdminResponse) {
        setSubAdmins([...subAdmins, createSubAdminResponse]);
        displaySnackbar('success', STRINGS.subAdminAdded);
      }
    } catch (err) {
      const error = err as ICustomErrorResponse;
      displaySnackbar('error', error.message);
      console.log(err);
    } finally {
      changeLoaderState(false);
    }
  };

  const setSubAdminsHandler = (subAdmin: ISubAdmin[]) => {
    setSubAdmins(subAdmin);
  };

  const updateSubAdmin = async (body: {
    subAdminId: number;
    data: Partial<IAddNewSubAdminRequest>;
  }) => {
    try {
      changeLoaderState(true);
      const updateSubAdminResponse = await updateSubAdminReq({
        subAdminId: body.subAdminId,
        body: body.data,
      }).unwrap();
      if (updateSubAdminResponse) {
        setSubAdmins((prev) => {
          const prevAdmins = [...prev];
          const index = prevAdmins.findIndex(
            (admin) => admin.id === updateSubAdminResponse.id
          );
          if (index !== -1) {
            displaySnackbar('success', STRINGS.subAdminUpdated);
            prevAdmins[index] = { ...updateSubAdminResponse };
          }
          return prevAdmins;
        });
      }
    } catch (err) {
      const error = err as ICustomErrorResponse;
      displaySnackbar('error', error.message);
      console.log(err);
    } finally {
      changeLoaderState(false);
    }
  };

  const contextValue: ISubAdminContext = {
    addSubAdmin: addSubAdminHandler,
    data: subAdmins,
    setSubAdmins: setSubAdminsHandler,
    updateSubAdmin: updateSubAdmin,
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
