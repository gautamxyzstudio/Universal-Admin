import { STRINGS } from '@/constant/en';

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
