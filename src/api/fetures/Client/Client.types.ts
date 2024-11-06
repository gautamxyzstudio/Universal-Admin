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
      company_detail: {
        id: number;
        companyname: string;
        companyemail: string;
        companylogo: {
          url: string;
        } | null;
      } | null;
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
  company: {
    id: number;
    companyname: string;
    companyemail: string;
    companylogo: string | null;
  } | null;
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

export type IRegisterClientResponse = {
  jwt: string;
  user:
    | {
        id: number;
        username: string;
        email: string;
        user_type: 'emp' | 'client';
      }
    | null
    | undefined;
};

export type IUpdateClientDetailsRequest = {
  data: {
    Name: string;
    companyname: string;
    contactno: string;
    Industry: string;
    Email: string;
    location: string;
    jobs: [];
    company_detail: number;
    clien_id: number;
    status: IClientStatus;
  };
};

export type IUpdateClientDetailsResponse = {
  data: {
    id: number;
    attributes: {
      Name: string;
      companyname: string;
      contactno: string;
      Industry: string;
      location: string;
      Email: string;
      status: IClientStatus;
    } | null;
  };
};
