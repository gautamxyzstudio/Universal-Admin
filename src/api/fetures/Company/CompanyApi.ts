import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  IAddANewCompanyRequest,
  IAddNewCompanyResponse,
  ICompany,
  ICompanyDetails,
  IGetCompaniesCustomizedResponse,
  IGetCompaniesResponse,
  IGetCompanyClientResponse,
  IGetCompanyDetailsResponse,
  IJobPostCustomizedResponse,
  IJobPostTypes,
  IPostedJobsResponse,
} from "./Company.types";
import { createImageUrl } from "@/utility/cookies";

const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query<
      IGetCompaniesCustomizedResponse,
      { page: number; search: string; perPage?: number }
    >({
      query: (body: { page: number; search: string; perPage?: number }) => ({
        url: Endpoints.getCompanies(body.page, body.search, body?.perPage),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetCompaniesResponse
      ): IGetCompaniesCustomizedResponse => {
        const companies: ICompany[] = [];
        response.data.forEach((comp, index) => {
          companies.push({
            id: comp.id,
            sNum: index + 1,
            companyname: comp.attributes.companyname,
            companyemail: comp.attributes.companyemail,
            location: comp.attributes.location,
            contactno: comp.attributes.contactno,
            address: comp.attributes.address,
            Industry: comp.attributes.Industry,
            Website: comp.attributes.Website,
            regNo: comp.attributes.regNo,
            gstNo: comp.attributes.gstNo,
            companylogo: comp.attributes.companylogo?.data.attributes.url
              ? createImageUrl(comp.attributes.companylogo?.data.attributes.url)
              : null,
          });
        });
        return {
          data: companies,
          meta: response.meta,
        };
      },
    }),
    addCompany: builder.mutation<
      IAddNewCompanyResponse,
      IAddANewCompanyRequest
    >({
      query: (body: IAddANewCompanyRequest) => ({
        url: Endpoints.addCompany,
        method: ApiMethodType.post,
        body,
      }),
    }),
    getCompanyDetails: builder.query({
      query: (company_id) => ({
        url: Endpoints.getCompanyDetails(company_id),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetCompanyDetailsResponse
      ): ICompanyDetails => {
        return {
          id: response.id,
          companyname: response.companyname,
          companyemail: response.companyemail,
          location: response.location,
          contactno: response.contactno,
          address: response.address,
          companylogo: response.companylogo?.url
            ? createImageUrl(response.companylogo?.url)
            : null,
          Industry: response.Industry,
          Website: response.Website,
          regNo: response.regNo,
          gstNo: response.gstNo,
        };
      },
    }),
    getPostedJob: builder.query({
      query: (company_id) => ({
        url: Endpoints.getOpenJobPost(company_id),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IPostedJobsResponse
      ): IJobPostCustomizedResponse => {
        const data: IJobPostTypes[] = [];
        if (response.data) {
          response.data.forEach((job) => {
            if (job.id) {
              data.push({
                ...job,
                id: job.id,
                status: job.status,
                notAccepting: job?.notAccepting ?? false,
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
              });
            }
          });
        }

        return {
          data: data,
          pagination: response?.meta && {
            page: response.meta?.page ?? 1,
            pageSize: response?.meta.pageSize ?? 1,
            pageCount: response?.meta.total ?? 1,
            total: response?.meta.totalPages ?? 1,
          },
        };
      },
    }),
    getClosedJobs: builder.query({
      query: (company_id) => ({
        url: Endpoints.getClosedJobPost(company_id),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IPostedJobsResponse
      ): IJobPostCustomizedResponse => {
        const data: IJobPostTypes[] = [];
        if (response.data) {
          response.data.forEach((job) => {
            if (job.id) {
              data.push({
                ...job,
                id: job.id,
                status: job.status,
                notAccepting: job?.notAccepting ?? false,
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
              });
            }
          });
        }

        return {
          data: data,
          pagination: response?.meta && {
            page: response.meta?.page ?? 1,
            pageSize: response?.meta.pageSize ?? 1,
            pageCount: response?.meta.total ?? 1,
            total: response?.meta.totalPages ?? 1,
          },
        };
      },
    }),
    getCompanyClientDetails: builder.query({
      query: (company_id) => ({
        url: Endpoints.getCompanyClients(company_id),
        method: ApiMethodType.get,
      }),
      transformResponse: (response: IGetCompanyClientResponse) => {
        const data = response.map((client) => {
          return client;
        });
        console.log(data);
        return data
      },
    }),
  }),
});

export const {
  useLazyGetCompanyQuery,
  useGetCompanyQuery,
  useAddCompanyMutation,
  useGetPostedJobQuery,
  useLazyGetPostedJobQuery,
  useGetClosedJobsQuery,
  useLazyGetClosedJobsQuery,
  useGetCompanyDetailsQuery,
  useLazyGetCompanyDetailsQuery,
  useGetCompanyClientDetailsQuery,
  useLazyGetCompanyClientDetailsQuery,
} = companiesApi;
