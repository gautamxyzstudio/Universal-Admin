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
} from './Client.types';

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
    registerClient: builder.mutation<any, IRegisterClientReq>({
      query: (body: IRegisterClientReq) => ({
        url: Endpoints.registerClient,
        method: ApiMethodType.post,
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetClientsQuery,
  useGetPendingRequestsQuery,
  useLinkClientMutation,
  useRegisterClientMutation,
} = clientApi;
