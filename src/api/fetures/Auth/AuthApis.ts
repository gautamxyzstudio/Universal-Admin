import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import { ILoginApiResponse, ILoginArgs } from './types';
import { ApiMethodType } from '@/api/ApiConstants';
import { ICustomErrorResponse, IErrorResponse } from '@/api/types';
import { STRINGS } from '@/constant/en';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginApiResponse, ILoginArgs>({
      query: (body) => ({
        url: Endpoints.login,
        method: ApiMethodType.post,
        body,
      }),
      transformResponse: (response: ILoginApiResponse) => {
        return response;
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

export const { useLoginMutation } = authApi;
