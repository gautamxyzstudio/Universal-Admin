import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  IAddNewSubAdminRequest,
  IAddNewSubAdminResponse,
  IGetSubAdminResponse,
  ISubAdmin,
  IUpdateSubAdminRequestBody,
  IUpdateSubAdminResponse,
} from './SubAdminApi.types';
import { IErrorResponse, ICustomErrorResponse } from '@/api/types';
import { STRINGS } from '@/constant/en';

const subAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubAdmins: builder.query<IGetSubAdminResponse, null>({
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
    updateSubAdmin: builder.mutation<ISubAdmin, IUpdateSubAdminRequestBody>({
      query: (body: IUpdateSubAdminRequestBody) => ({
        url: Endpoints.updateSubAdmin(body.subAdminId),
        method: ApiMethodType.patch,
        body: body.body,
      }),
      transformResponse: (response: IUpdateSubAdminResponse) => {
        return response.data;
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

export const {
  useGetSubAdminsQuery,
  useAddNewSubAdminMutation,
  useUpdateSubAdminMutation,
} = subAdminApi;
