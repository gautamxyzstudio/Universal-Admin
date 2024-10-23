/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAddNewSubAdminRequest,
  ISubAdmin,
} from '@/api/fetures/SubAdmin/SubAdminApi.types';

export interface ISubAdminContext {
  addSubAdmin: (params: IAddNewSubAdminRequest) => void;

  data: ISubAdmin[];
  setSubAdmins: (subAdmins: ISubAdmin[]) => void;
  updateSubAdmin: (body: {
    subAdminId: number;
    data: Partial<IAddNewSubAdminRequest>;
  }) => void;
}
