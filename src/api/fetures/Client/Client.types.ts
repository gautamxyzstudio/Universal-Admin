import { IPagination } from '@/api/types';

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
      status: 'approved';
      location: string;
    } | null;
  }[];
  meta: IPagination;
};

export interface IClient {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  detailsId: number;
  joiningDate: Date;
  location: string;
  selfie: string;
  companyName: string;
}

export type ICustomizedGetClientsResponse = {
  data: IClient[];
  pagination: IPagination;
};
