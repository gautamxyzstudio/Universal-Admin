import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: Endpoints.getUsers,
        method: ApiMethodType.get,
      }),
      transformResponse: (response) => {
        return response ;
      },
    }),
  }),
});

export const {useGetAllUsersQuery, useLazyGetAllUsersQuery} = usersApi;
