import { IPagination } from '@/api/types';
import { IClientStatus } from '@/constant/enums';

export type IGetClientsResponse = {
  data: {
    id: number;
    email: string;
    user_type: 'client';
    updatedAt: Date;
    cuser_id: {
      id: number;
      Name: string;
      companyname: string;
      contactno: string;
      Industry: string;
      status: IClientStatus;
      location: string;
    } | null;
  }[];
  meta: IPagination;
};

export interface IClient {
  id: number;
  name: string | null;
  status: 's0' | 's1' | 's2';
  email: string;
  phone: string | null;
  detailsId: number;
  joiningDate: Date;
  location: string;
  selfie: string;
  companyName: string;
  industry: string;
}

export type ICustomizedGetClientsResponse = {
  data: IClient[];
  pagination: IPagination;
};

export interface ILinkClientRequest {
  status: IClientStatus.ACTIVE;
  Name: string;

  companyname: string;

  location: string;
  Industry: string;
  company_detail: number;
}

export type IRegisterClientReq = {
  username: string;
  email: string;
  password: string;
  role: 'ClientUser';
  user_type: 'client';
};
