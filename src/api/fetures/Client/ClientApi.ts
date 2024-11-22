/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  IClient,
  IClientDetailsResponse,
  ICustomizedGetClientsResponse,
  IGetClientDetailsResponse,
  IGetClientsResponse,
  ILinkClientRequest,
  IRegisterClientReq,
  IRegisterClientResponse,
  IUpdateClientDetailsRequest,
  IUpdateClientDetailsResponse,
} from "./Client.types";
import { createImageUrl } from "@/utility/cookies";
import { IClientStatus, IJobPostStatus } from "@/constant/enums";
import { IJobPostCustomizedResponse, IJobPostTypes, IPostedJobsResponse } from "../Company/Company.types";

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
              selfie: "",
              company: {
                id: client.cuser_id.company_detail?.id ?? 0,
                companyname: client.cuser_id.company_detail?.companyname ?? "",
                companyemail:
                  client.cuser_id.company_detail?.companyemail ?? "",
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
              selfie: "",
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
        body:{
          status:body.status
        }
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
    getPostedJobByClient: builder.query<IJobPostCustomizedResponse,{page: number,clientId: number, perPage: number}>({
      query: ({page,clientId, perPage}:{page:number,clientId:number, perPage: number}) => ({
        url: Endpoints.getPostJobsByClient(clientId,page, perPage),
        method: ApiMethodType.get,
      }),
      transformResponse: (response:IPostedJobsResponse):IJobPostCustomizedResponse => {
        console.log(response, "api response of post job by client");
        const data : IJobPostTypes[] = [];
        if(response.data){
          response.data.forEach((job)=> {
            if(job.id){
              data.push({
                ...job,
                id: job.id,
                status: IJobPostStatus.OPEN,
                notAccepting: job.notAccepting ?? false,
                client_details: job.client_details
                ? {
                    id: job.client_details[0].id,
                    Name: job.client_details[0].Name,
                    companyname: job.client_details[0].companyname,
                    Industry: job.client_details[0].Industry,
                    Email: job.client_details[0].Email,
                    location: job.client_details[0].location,
                    company_detail: job.client_details[0].company_detail
                      ? {
                          companyname:
                            job.client_details[0].company_detail
                              ?.companyname ?? "",
                          id: job.client_details[0].company_detail?.id ?? 0,
                          companylogo: job.client_details[0].company_detail
                            ?.companylogo
                            ? {
                                url: createImageUrl(
                                  job.client_details[0].company_detail
                                    ?.companylogo.url || ""
                                ),
                                mime: job.client_details[0].company_detail
                                  ?.companylogo.mime,
                                id: job.client_details[0].company_detail
                                  ?.companylogo.id,
                                name: job.client_details[0].company_detail
                                  ?.companylogo.name,
                                size: job.client_details[0].company_detail
                                  ?.companylogo.size,
                              }
                            : null,
                        }
                      : null,
                  }
                : null,
              })
            }
          })
        }
        return {
          data: data,
          pagination: response?.meta && {
            page: response.meta?.page ?? 1,
            pageSize: response.meta?.pageSize ?? 1,
            pageCount: response.meta?.totalPages ?? 1,
            total: response.meta?.total ?? 1,
          }
        };
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
  useGetPostedJobByClientQuery,
  useLazyGetPostedJobByClientQuery,
  useLazyGetPendingRequestsQuery,
} = clientApi;
