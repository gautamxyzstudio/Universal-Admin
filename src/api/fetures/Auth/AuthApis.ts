import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import { IImageUploadResponse, ILoginApiResponse, ILoginArgs } from './types';
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
    }),
    uploadFile: builder.mutation<IImageUploadResponse, FormData>({
      query: (formData: FormData) => ({
        url: Endpoints.uploadFiles,
        method: ApiMethodType.post,
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useLoginMutation, useUploadFileMutation } = authApi;
