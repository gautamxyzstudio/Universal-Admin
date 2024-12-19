import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  IGetUsersApiResponse,
  IGetUsersCustomizedResponse,
  IUsers,
} from "./UsersApi.types";
import { createImageUrl } from "@/utility/cookies";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: Endpoints.getUsers,
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetUsersApiResponse
      ): IGetUsersCustomizedResponse => {
        const userDetails: IUsers[] = [];
        if (response) {
          response.data.forEach((user) => {
            userDetails.push({
              id: user.id,
              email: user.email,
              role: user.user_type,
              createdAt: new Date(user.createdAt),
              employee: user.euser_id
                ? {
                    id: user.euser_id.id,
                    name: user.euser_id.name,
                    contactNumber: user.euser_id.phone,
                    employeeImage: user.euser_id.selfie
                      ? createImageUrl(user.euser_id.selfie[0].url)
                      : "",
                  }
                : null,
              client: user.cuser_id
                ? {
                    id: user.cuser_id.id,
                    name: user.cuser_id.Name,
                    contactNumber: user.cuser_id.contactno,
                    clientCompanyLogo: user.cuser_id.company_detail?.companylogo
                      ? createImageUrl(
                          user.cuser_id.company_detail.companylogo.url
                        )
                      : "",
                  }
                : null,
            });
          });
        }
        return {
          data: userDetails,
          pagination: {
            total: response.meta.total,
            page: response.meta.page,
            pageSize: response.meta.pageSize,
            totalPages: response.meta.totalPages,
          }
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = usersApi;
