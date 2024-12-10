import { IJobPostStatus } from "@/constant/enums";

export interface IGetIssueRaisedByEmpApiResponse {
  data: {
    id: number;
    Issue: string;
    publishedAt: Date | string;
    status: IJobPostStatus;
    employee_detail: {
      id: number;
      name: string;
      email: string;
      phone: string;
      selfie: {
        name: string;
        url: string;
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

export interface ICustomizedIssueRaisedByEmpApiResponse {
  data: IIssueRaisedByEmployee[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    totalPages: number;
  };
}

export interface IIssueRaisedByEmployee {
  id: number;
  issue: string | null;
  publishedAt: Date | string | null;
  issueStatus: IJobPostStatus;
  employeeName: string | null;
  employeeEmail: string | null;
  employeePhone: string | null;
  employeeId: number | null;
  employeeImageUrl: string | null;
}

// By Clients
export interface IGetIssueRaisedByClientApiResponse {
  data:{
    id: number;
    Issue: string;
    publishedAt: Date | string;
    status: IJobPostStatus;
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
    pageCount: number;
    totalPages: number;
  };
}

export interface IIssueRaisedByClient {
  id: number;
  issue: string | null;
  publishedAt: Date | string | null;
  issueStatus: IJobPostStatus;
  clientId: number;
  clientName: string | null;
  clientEmail: string | null;
  clientPhone: string | null;
  clientCompanyName: string | null;
  clientCompanyLogoUrl: string | null;
}
