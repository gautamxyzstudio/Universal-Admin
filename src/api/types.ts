import { STRINGS } from '@/constant/en';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
