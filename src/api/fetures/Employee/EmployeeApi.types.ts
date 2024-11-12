import { IDocumentStatus } from '@/constant/enums';

export interface IGetEmployeeApiResponse {
  data: {
    id: number;
    email: string;
    euser_id: {
      id: number;
      name: string;
      gender: string;
      email: string;
      phone: string;
      sinNo: string;
      workStatus: string;
      selfie: {
        url: string;
      }[] | null;
    };
  }[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface IEmployeeBasic {
  id: number;
  name: string;
  selfie: string;
  detailsId: number;
  gender: string;
  email: string;
  phone: string;
  sinNo: string;
  workStatus: string;
  docStatus: IDocumentStatus;
}

export interface ICustomizedEmployeeApiResponse {
  employees: IEmployeeBasic[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
