/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  IClient,
  ICustomizedGetClientsResponse,
  IGetClientsResponse,
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
  }),
});

export const { useLazyGetClientsQuery } = clientApi;
