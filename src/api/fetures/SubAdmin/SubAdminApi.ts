import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  IAddNewSubAdminRequest,
  IAddNewSubAdminResponse,
  ISubAdmin,
} from './SubAdminApi.types';
import { IErrorResponse, ICustomErrorResponse } from '@/api/types';
import { STRINGS } from '@/constant/en';

const subAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubAdmins: builder.query({
      query: () => ({
        url: Endpoints.getSubAdmins,
        method: ApiMethodType.get,
      }),
      transformErrorResponse: (
        response: IErrorResponse
      ): ICustomErrorResponse => {
        return {
          message:
            response?.data?.error?.message ?? STRINGS.something_went_wrong,
          statusCode: response?.status ?? 0,
        };
      },
    }),
    addNewSubAdmin: builder.mutation<ISubAdmin, IAddNewSubAdminRequest>({
      query: (body: IAddNewSubAdminRequest) => ({
        url: Endpoints.addNewSubAdmin,
        method: ApiMethodType.post,
        body,
      }),
      transformResponse: (response: IAddNewSubAdminResponse): ISubAdmin => {
        return response.user;
      },
      transformErrorResponse: (
        response: IErrorResponse
      ): ICustomErrorResponse => {
        return {
          message:
            response?.data?.error?.message ?? STRINGS.something_went_wrong,
          statusCode: response?.status ?? 0,
        };
      },
    }),
  }),
});

export const { useGetSubAdminsQuery, useAddNewSubAdminMutation } = subAdminApi;
