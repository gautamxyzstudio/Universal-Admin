import { IJobPostStatus } from "@/constant/enums";

export interface IGetIssueRaisedByEmpApiResponse {
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
}
// meta: {
//   pagination: {
//     total: number;
//     page: number;
//     pageSize: number;
//     totalPages: number;
//   };
// };

export interface ICustomizedIssueRaisedByEmpApiResponse {
  data: IIssueRaisedByEmployee[];
  // pagination: {
  //   page: number;
  //   pageSize: number;
  //   total: number;
  //   totalPages: number;
  // };
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
}

export interface ICustomizedIssueRaisedByClientApiResponse {
  data: IIssueRaisedByClient[];
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