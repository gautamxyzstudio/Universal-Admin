import { IUserTypesEnum } from '@/constant/enums';

export interface IGetUsersApiResponse {
  data: {
    id: number;
    email: string;
    user_type: IUserTypesEnum;
    createdAt: Date | string;
    euser_id: {
      id: number;
      name: string;
      phone: string;
      selfie:
        | [
            {
              id: number;
              url: string;
            }
          ]
        | null;
    } | null;
    cuser_id: {
      id: number;
      Name: string;
      contactno: string;
      company_detail: {
        id: number;
        companylogo: {
          id: number;
          url: string;
        };
      };
    } | null;
  }[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface IUsers {
  id: number;
  email: string;
  role: IUserTypesEnum;
  createdAt: Date | string;
  employee: {
    id: number;
    name: string;
    contactNumber: string;
    employeeImage: string;
  } | null;
  client: {
    id: number;
    name: string;
    contactNumber: string;
    clientCompanyLogo: string;
  } | null;
}

export interface IGetUsersCustomizedResponse {
  data: IUsers[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface IAnalyticsResponse {
  message: string;
  data: {
    id: number;
    totalEmployees: number;
    totalClients: number;
    totalJobs: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    publishedAt: null;
    openJobs: number;
    totalCompany: number;
    newClients: string;
    newEmployees: string;
    pendingRequests: number | null;
    employeeChange: number;
    clientChange: number;
    pendingRequestChange: number;
    totalJobsChange: number;
  };
}

export interface IAnalytics {
  id: number;
  totalEmployees: number;
  totalClients: number;
  totalJobs: number;
  openJobs: number;
  totalCompany: number;
  newClients: string;
  newEmployees: string;
  pendingRequests: number | null;
  employeeChange: number;
  clientChange: number;
  pendingRequestChange: number;
  totalJobsChange: number;
}
