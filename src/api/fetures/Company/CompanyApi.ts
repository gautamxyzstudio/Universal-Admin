import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';

const subAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: Endpoints.getCompanies,
        method: ApiMethodType.get,
      }),
    }),
  }),
});

export const { useGetCompanyQuery } = subAdminApi;
