/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  IClient,
  IClientDetailsResponse,
  ICustomizedGetClientResponse,
  ICustomizedGetClientsResponse,
  IGetClientDetailsResponse,
  IGetClientJobsResponse,
  IGetClientsResponse,
  ILinkClientRequest,
  IRegisterClientReq,
  IRegisterClientResponse,
  IUpdateClientDetailsRequest,
  IUpdateClientDetailsResponse,
} from './Client.types';
import { createImageUrl } from '@/utility/cookies';
import { IClientStatus, IJobPostStatus, IJobTypesEnum } from '@/constant/enums';
import { IJobPost } from '../Employee/EmployeeApi.types';

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
    changeClientStatus: builder.mutation<
      IClientDetailsResponse,
      { clientId: number; status: IClientStatus }
    >({
      query: (body: { clientId: number; status: IClientStatus }) => ({
        url: Endpoints.getClientDetails(body.clientId),
        method: ApiMethodType.patch,
        body: {
          status: body.status,
        },
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
    getClientDetails: builder.query({
      query: (detailsId) => ({
        url: Endpoints.getClientDetails(detailsId),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        res: IGetClientDetailsResponse
      ): IClientDetailsResponse => {
        return {
          id: res.data?.id,
          name: res.data?.attributes?.Name,
          location: res.data?.attributes?.location,
          email: res.data?.attributes?.Email,
          contactNo: res.data?.attributes?.contactno,
          status: res.data?.attributes?.status,
          createdAt: res.data?.attributes?.createdAt,
          companyName:
            res.data.attributes.company_detail?.data?.attributes.companyname,
          industry:
            res.data.attributes.company_detail?.data?.attributes.Industry,
          companyLogo: res.data.attributes.company_detail?.data?.attributes
            .companylogo?.data?.attributes
            ? createImageUrl(
                res.data.attributes.company_detail.data.attributes.companylogo
                  .data.attributes.url
              )
            : null,
        };
      },
    }),
    getPostedJobByClient: builder.query({
      query: ({ clientId, page }: { clientId: number; page: number }) => ({
        url: Endpoints.getPostJobsByClient(clientId, page, 10),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetClientJobsResponse
      ): ICustomizedGetClientResponse => {
        let resp: ICustomizedGetClientResponse = {
          data: [],
          pagination: undefined,
        };
        const jobs: IJobPost[] = [];
        if (response.data && response.data.length > 0) {
          response.data.forEach((job) => {
            if (job) {
              jobs.push({
                status: job?.status ?? IJobPostStatus.OPEN,
                CheckIn: null,
                CheckOut: null,
                id: job.id ?? 0,
                job_name: job.job_name ?? '',
                city: job.city ?? '',
                address: job.address ?? '',
                postalCode: job.postalCode ?? '',
                postID: job.postID ?? '',
                notAccepting: job.notAccepting ?? null,
                gender: job.gender ?? '',
                salary: job.salary ?? '',
                job_type: job.job_type ?? IJobTypesEnum.EVENT,
                location: job.location ?? '',
                required_certificates: job.required_certificates ?? [],
                eventDate: job.eventDate ?? null,
                startShift: job.startShift ?? null,
                description: job.description ?? '',
                jobDuties: job.jobDuties ?? '',
                endShift: job.endShift ?? null,
                requiredEmployee: job.requiredEmployee ?? 0,
                client_details: {
                  clientId: job.client_details[0]?.id ?? 0,
                  clientName: job.client_details[0]?.Name ?? '',
                  id: job.client_details[0]?.company_detail.id ?? 0,
                  companyname:
                    job.client_details[0]?.company_detail.companyname ?? '',
                  companyemail:
                    job.client_details[0]?.company_detail.companyemail ?? '',
                  companylogo: job.client_details[0]?.company_detail.companylogo
                    .url
                    ? createImageUrl(
                        job.client_details[0]?.company_detail.companylogo.url
                      )
                    : '',
                },
              });
            }
          });
          resp = {
            data: jobs,
            pagination: response.meta,
          };
        }
        return resp;
      },
    }),
  }),
});

export const {
  useLazyGetClientsQuery,
  useGetPendingRequestsQuery,
  useLinkClientMutation,
  useAddClientDetailsMutation,
  useRegisterClientMutation,
  useGetClientDetailsQuery,
  useLazyGetClientDetailsQuery,
  useChangeClientStatusMutation,
  useLazyGetPostedJobByClientQuery,
  useLazyGetPendingRequestsQuery,
} = clientApi;
