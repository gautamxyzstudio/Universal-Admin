import { IJobPostStatus } from "@/constant/enums";

export interface IGetIssueRaisedApiResponse {
  data: {
    id: number;
    attributes: {
      Issue: string;
      publishedAt: Date | string;
      status: IJobPostStatus;
      employee_detail: {
        data: {
          id: number;
          attributes: {
            name: string;
            email: string;
            phone: string;
          };
        };
      };
    };
  }[];
  meta: {
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  };
}

export interface ICustomizedIssueRaisedApiResponse {
  data: IIssueRaisedByEmployee[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
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
}
