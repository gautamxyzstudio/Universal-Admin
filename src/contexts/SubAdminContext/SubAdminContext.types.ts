/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAddNewSubAdminRequest,
  ISubAdmin,
} from '@/api/fetures/SubAdmin/SubAdminApi.types';
import { ICustomErrorResponse } from '@/api/types';

export interface ISubAdminContext {
  addSubAdmin: (params: IAddNewSubAdminRequest) => void;
  addSubAdminState: {
    isLoading: boolean;
    data: ISubAdmin | null;
    error: ICustomErrorResponse;
  };
}
