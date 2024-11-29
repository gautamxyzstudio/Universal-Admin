import { IPagination } from '@/api/types';
import { IClientStatus, IJobPostStatus, IJobTypesEnum } from '@/constant/enums';
import { IJobPost } from '../Employee/EmployeeApi.types';

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

export type IGetClientDetailsResponse = {
  data: {
    id: number;
    attributes: {
      Email: string;
      Name: string;
      contactno: string;
      location: string;
      status: IClientStatus;
      createdAt: Date;
      company_detail: {
        data: {
          attributes: {
            Industry: string;
            companyname: string;
            companylogo: {
              data: {
                attributes: {
                  url: string;
                };
              } | null;
            } | null;
          };
        } | null;
      } | null;
    };
  };
};

export type IClientDetailsResponse = {
  id: number | null | undefined;
  name: string | null | undefined;
  location: string | null | undefined;
  createdAt: Date;
  companyName: string | null | undefined;
  industry: string | null | undefined;
  companyLogo: string | null | undefined;
  contactNo: string | null | undefined;
  email: string | null | undefined;
  status: IClientStatus;
};

export type ICustomizedGetClientResponse = {
  data: IJobPost[];
  pagination:
    | {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
      }
    | null
    | undefined;
};

export type IGetClientJobsResponse = {
  data: {
    id: number | null | undefined;
    job_name: string | null | undefined;
    city: string | null | undefined;
    address: string | null | undefined;
    postalCode: string | null | undefined;
    postID: string | null | undefined;
    gender: string | null | undefined;
    salary: string | null | undefined;
    job_type: IJobTypesEnum | null | undefined;
    location: string | null | undefined;
    required_certificates: string[] | null | undefined;
    startShift: Date | null | undefined;
    eventDate: Date | null | undefined;
    description: string | null | undefined;
    jobDuties: string | null | undefined;
    status: IJobPostStatus | null | undefined;
    endShift: Date | null | undefined;
    requiredEmployee: string | null | undefined;
    notAccepting: boolean | null | undefined;
    updatedAt: Date | null | undefined;
    client_details:
      | {
          id: number | null | undefined;
          Name: string | null | undefined;
          company_detail: {
            id: number | null | undefined;
            companyname: string | null | undefined;
            companyemail: string | null | undefined;
            companylogo: {
              url: string | null | undefined;
            };
          };
        }[];
  }[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};
