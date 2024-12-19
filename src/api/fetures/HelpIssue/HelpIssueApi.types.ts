import { IIssueRaisedStatusEnum, IUserTypesEnum } from "@/constant/enums";

export interface IGetIssueRaisedByEmpApiResponse {
  data: {
    id: number;
    Issue: string;
    publishedAt: Date | string;
    status: IIssueRaisedStatusEnum;
    isRead: boolean | null;
    employee_detail: {
      id: number;
      name: string;
      email: string;
      phone: string;
      selfie: [
        {
          name: string;
          url: string;
        }
      ];
    };
  }[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface ICustomizedIssueRaisedByEmpApiResponse {
  data: IIssueRaisedByEmployee[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
  };
}

export interface IIssueRaisedByEmployee {
  id: number;
  issue: string | null;
  publishedAt: Date | string | null;
  issueStatus: IIssueRaisedStatusEnum;
  isRead: boolean | null;
  employeeName: string | null;
  employeeEmail: string | null;
  employeePhone: string | null;
  employeeId: number | null;
  employeeImageUrl: string | null;
}

// By Clients
export interface IGetIssueRaisedByClientApiResponse {
  data: {
    id: number;
    Issue: string;
    publishedAt: Date | string;
    status: IIssueRaisedStatusEnum;
    isRead: boolean | null;
    client_detail: {
      id: number;
      Name: string;
      Email: string;
      contactno: string;
      company_detail: {
        companyname: string;
        companylogo: {
          url: string;
        };
      };
    };
  }[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface ICustomizedIssueRaisedByClientApiResponse {
  data: IIssueRaisedByClient[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
  };
}

export interface IIssueRaisedByClient {
  id: number;
  issue: string | null;
  publishedAt: Date | string | null;
  issueStatus: IIssueRaisedStatusEnum;
  isRead: boolean | null;
  clientId: number;
  clientName: string | null;
  clientEmail: string | null;
  clientPhone: string | null;
  clientCompanyName: string | null;
  clientCompanyLogoUrl: string | null;
}

export interface IGetIssueRaisedByIdApiResponse {
  id: number;
  Issue: string;
  publishedAt: Date | string | null;
  status: IIssueRaisedStatusEnum;
  isRead: true;
  user_type?: IUserTypesEnum | null;
  employee_detail: {
    id: number;
    name: string;
    email: string;
    phone: string;
    selfie: [
      {
        name: string;
        url: string;
      }
    ];
  } | null;
  client_detail: {
    id: number;
    Name: string;
    Email: string;
    contactno: string;
    company_detail: {
      companyname: string;
      companylogo: {
        url: string;
      };
    };
  } | null;
}

export interface IIssueRaisedById {
  id: number;
  issue: string | null;
  publishedAt: Date | string | null;
  issueStatus: IIssueRaisedStatusEnum;
  user_type?: IUserTypesEnum | null;
  isRead: boolean | string | null;
  employeeDetails: {
    employeeId: number;
    employeeName: string | null;
    employeeEmail: string | null;
    employeePhone: string | null;
    employeeImageUrl: string | null;
  } | null;
  clientDetails: {
    clientId: number;
    clientName: string | null;
    clientEmail: string | null;
    clientPhone: string | null;
    clientCompanyName: string | null;
    clientCompanyLogoUrl: string | null;
  } | null;
}
