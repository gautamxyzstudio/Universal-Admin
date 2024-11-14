/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  IClient,
  ICustomizedGetClientsResponse,
  IGetClientsResponse,
  ILinkClientRequest,
  IRegisterClientReq,
  IRegisterClientResponse,
  IUpdateClientDetailsRequest,
  IUpdateClientDetailsResponse,
} from './Client.types';
import { createImageUrl } from '@/utility/cookies';

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<ICustomizedGetClientsResponse, { page: number }>({
      query: ({ page }: { page: number }) => ({
        url: Endpoints.getClients(page),
        method: ApiMethodType.get,
      }),
      transformResponse: (res: IGetClientsResponse) => {
        const clients: IClient[] = [];
        res.data.forEach((client) => {
          if (client.cuser_id) {
            clients.push({
              id: client.id,
              name: client.cuser_id.Name,
              email: client.email,
              phone: client.cuser_id.contactno,
              status: client.cuser_id.status,
              detailsId: client.cuser_id.id,
              joiningDate: new Date(client.updatedAt),
              location: client.cuser_id.location,
              selfie: '',
              company: {
                id: client.cuser_id.company_detail?.id ?? 0,
                companyname: client.cuser_id.company_detail?.companyname ?? '',
                companyemail:
                  client.cuser_id.company_detail?.companyemail ?? '',
                companylogo: client.cuser_id.company_detail?.companylogo?.url
                  ? createImageUrl(
                      client.cuser_id.company_detail?.companylogo?.url
                    )
                  : null,
              },
              companyName: client.cuser_id.companyname,
              industry: client.cuser_id?.Industry,
            });
          }
        });
        return {
          data: clients,
          pagination: {
            page: res.meta.page,
            pageSize: res.meta.pageSize,
            pageCount: res.meta.pageSize,
            total: res.meta.total,
          },
        };
      },
    }),
    getPendingRequests: builder.query<
      ICustomizedGetClientsResponse,
      { page: number }
    >({
      query: ({ page }: { page: number }) => ({
        url: Endpoints.getPendingRequests(page),
        method: ApiMethodType.get,
      }),
      transformResponse: (res: IGetClientsResponse) => {
        const clients: IClient[] = [];
        res.data.forEach((client) => {
          if (client.cuser_id) {
            clients.push({
              id: client.id,
              name: client.cuser_id.Name,
              email: client.email,
              phone: client.cuser_id.contactno,
              status: client.cuser_id.status,
              detailsId: client.cuser_id.id,
              joiningDate: new Date(client.updatedAt),
              location: client.cuser_id.location,
              selfie: '',
              company: null,
              companyName: client.cuser_id.companyname,
              industry: client.cuser_id?.Industry,
            });
          }
        });
        return {
          data: clients,
          pagination: {
            page: res.meta.page,
            pageSize: res.meta.pageSize,
            pageCount: res.meta.pageSize,
            total: res.meta.total,
          },
        };
      },
    }),
    linkClient: builder.mutation<
      IClient,
      { clientDetails: ILinkClientRequest; clientId: number }
    >({
      query: (body: {
        clientDetails: ILinkClientRequest;
        clientId: number;
      }) => ({
        url: Endpoints.linkClient(body.clientId),
        method: ApiMethodType.patch,
        body: body.clientDetails,
      }),
    }),
    registerClient: builder.mutation<{ clientId: number }, IRegisterClientReq>({
      query: (body: IRegisterClientReq) => ({
        url: Endpoints.registerClient,
        method: ApiMethodType.post,
        body,
      }),
      transformResponse: (response: IRegisterClientResponse) => {
        return {
          clientId: response.user?.id ?? 0,
        };
      },
    }),
    addClientDetails: builder.mutation<
      IUpdateClientDetailsResponse,
      IUpdateClientDetailsRequest
    >({
      query: (body) => ({
        url: Endpoints.addClientDetails,
        method: ApiMethodType.post,
        body: body,
      }),
    }),
    
  }),
});

export const {
  useLazyGetClientsQuery,
  useGetPendingRequestsQuery,
  useLinkClientMutation,
  useAddClientDetailsMutation,
  useRegisterClientMutation,
} = clientApi;
