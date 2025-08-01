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

const subAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubAdmins: builder.query<IGetSubAdminResponse, null>({
      query: () => ({
        url: Endpoints.getSubAdmins(1),
        method: ApiMethodType.get,
      }),
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
    }),
  }),
});

export const {
  useGetSubAdminsQuery,
  useAddNewSubAdminMutation,
  useUpdateSubAdminMutation,
} = subAdminApi;
