import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        url: Endpoints.getEmployees,
        method: ApiMethodType.get,
      }),
    }),
  }),
});

export const { useGetEmployeesQuery } = authApi;
