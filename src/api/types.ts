import { STRINGS } from "@/constant/en";
import { IIssueRaisedStatusEnum } from "@/constant/enums";

export interface ICustomErrorResponse {
  message: string;
  statusCode: number | string;
}

export interface IErrorResponse {
  status: number | string;
  data: {
    data: null;
    error: {
      status: number;
      name: string;
      message: string;
      details: object;
    };
  };
}

export const transformErrorResponse = (
  response: IErrorResponse
): ICustomErrorResponse => {
  return {
    message: response?.data?.error?.message ?? STRINGS.something_went_wrong,
    statusCode: response?.status ?? 0,
  };
};

export type IPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export const getIssueRaisedByEmployeeUrl = (
  searchVal: string | null,
  pageNo: number,
  status: IIssueRaisedStatusEnum | null
) => {
  if (status && pageNo) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raised/emp?populate=*&page=${pageNo}&pageSize=5&status=${status}`;
  } else if (searchVal && pageNo) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raised/emp?populate=*&page=${pageNo}&pageSize=5&search=${searchVal}`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raised/emp?populate=*&page=${pageNo}&pageSize=5`;
  }
};
export const getIssueRaisedByClientUrl = (
  searchVal: string | null,
  pageNo: number,
  status: IIssueRaisedStatusEnum | null
) => {
  if (status && pageNo) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raised/client?populate=*&page=${pageNo}&pageSize=5&status=${status}`;
  } else if (searchVal && pageNo) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raised/client?populate=*&page=${pageNo}&pageSize=5&search=${searchVal}`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raised/client?populate=*&page=${pageNo}&pageSize=5`;
  }
};
