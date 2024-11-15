import { IClientStatus } from '@/constant/enums';

export type IAddEmployeeClientArgs = {
  name: string;
  email: string;
  phone: string;
  compName: string;
  industry: string;
  location: string;
  status: IClientStatus;
  password: string;
};
