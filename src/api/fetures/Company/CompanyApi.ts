import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  IAddANewCompanyRequest,
  IAddNewCompanyResponse,
  IAddNewJobPostRequest,
  ICompany,
  ICompanyDetails,
  IGetCompaniesCustomizedResponse,
  IGetCompaniesResponse,
  IGetCompanyClientResponse,
  IGetCompanyDetailsResponse,
  IJobPostCustomizedResponse,
  IGetPostedJobsResponse,
  ICompanyClientDetails,
  IGetCustomizeCompanyClientResponse,
} from "./Company.types";
import { createImageUrl } from "@/utility/cookies";
import { IJobPost } from "../Employee/EmployeeApi.types";
import { IJobPostStatus, IJobTypesEnum } from "@/constant/enums";

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
      query: (company_id: number) => ({
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
        response: IGetPostedJobsResponse
      ): IJobPostCustomizedResponse => {
        const data: IJobPost[] = [];
        if (response.data) {
          response.data.forEach((job) => {
            if (job) {
              data.push({
                ...job,
                id: job.id ?? 0,
                status: job?.status ?? IJobPostStatus.OPEN,
                CheckIn: null,
                CheckOut: null,
                notAccepting: job?.notAccepting ?? null,
                job_name: job.job_name ?? "",
                city: job.city ?? "",
                address: job.address ?? "",
                location: job.location ?? "",
                postalCode: job.postalCode ?? "",
                postID: job.postID ?? "",
                gender: job.gender ?? "",
                salary: job.salary ?? "",
                job_type: job.job_type ?? IJobTypesEnum.EVENT,
                required_certificates: job.required_certificates ?? [],
                eventDate: job.eventDate ?? null,
                startShift: job.startShift ?? null,
                description: job.description ?? "",
                jobDuties: job.jobDuties ?? "",
                endShift: job.endShift ?? null,
                requiredEmployee: job.requiredEmployee ?? 0,
                client_details: {
                  clientId: job.client_details[0]?.id ?? 0,
                  clientName: job.client_details[0]?.Name ?? "",
                  id: job.client_details[0]?.company_detail.id ?? 0,
                  companyname:
                    job.client_details[0]?.company_detail.companyname ?? "",
                  companyemail:
                    job.client_details[0]?.company_detail.companyemail ?? "",
                  companylogo: job.client_details[0]?.company_detail.companylogo
                    .url
                    ? createImageUrl(
                        job.client_details[0]?.company_detail.companylogo.url
                      )
                    : "",
                },
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
        response: IGetPostedJobsResponse
      ): IJobPostCustomizedResponse => {
        const data: IJobPost[] = [];
        if (response.data) {
          response.data.forEach((job) => {
            if (job.id) {
              data.push({
                ...job,
                id: job.id ?? 0,
                status: job?.status ?? IJobPostStatus.OPEN,
                CheckIn: null,
                CheckOut: null,
                notAccepting: job?.notAccepting ?? null,
                job_name: job.job_name ?? "",
                city: job.city ?? "",
                address: job.address ?? "",
                location: job.location ?? "",
                postalCode: job.postalCode ?? "",
                postID: job.postID ?? "",
                gender: job.gender ?? "",
                salary: job.salary ?? "",
                job_type: job.job_type ?? IJobTypesEnum.EVENT,
                required_certificates: job.required_certificates ?? [],
                eventDate: job.eventDate ?? null,
                startShift: job.startShift ?? null,
                description: job.description ?? "",
                jobDuties: job.jobDuties ?? "",
                endShift: job.endShift ?? null,
                requiredEmployee: job.requiredEmployee ?? 0,
                client_details: {
                  clientId: job.client_details[0]?.id ?? 0,
                  clientName: job.client_details[0]?.Name ?? "",
                  id: job.client_details[0]?.company_detail.id ?? 0,
                  companyname:
                    job.client_details[0]?.company_detail.companyname ?? "",
                  companyemail:
                    job.client_details[0]?.company_detail.companyemail ?? "",
                  companylogo: job.client_details[0]?.company_detail.companylogo
                    .url
                    ? createImageUrl(
                        job.client_details[0]?.company_detail.companylogo.url
                      )
                    : "",
                },
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
      transformResponse: (
        response: IGetCompanyClientResponse
      ): IGetCustomizeCompanyClientResponse => {
        const data: ICompanyClientDetails[] = [];
        if (response) {
          response.data.forEach((client) => {
            if (client) {
              data.push({
                id: client.attributes?.id ?? 0,
                clientName: client.attributes?.Name ?? "",
                clientEmail: client.attributes?.Email ?? "",
                clientLocation: client.attributes?.location ?? "",
                clientContactno: client.attributes?.contactno ?? "",
                joinDate: client.attributes?.publishedAt ?? new Date(),
                clientCompanyName:
                  client.attributes?.company_detail?.companyname ?? "",
                clientCompanyIndustry:
                  client.attributes?.company_detail?.Industry ?? "",
              });
            }
          });
        }
        return {
          data: data,
        };
      },
    }),
    updateJobPost: builder.mutation<
      IJobPost,
      { jobPostDetails: IAddNewJobPostRequest; jobPostId: number }
    >({
      query: (body: {
        jobPostDetails: IAddNewJobPostRequest;
        jobPostId: number;
      }) => ({
        url: Endpoints.updateJobPost(body.jobPostId),
        method: ApiMethodType.patch,
        body: body.jobPostDetails,
      }),
      transformResponse: (response: IJobPost) => {
        console.log(response, "api response");
        return response;
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
  useUpdateJobPostMutation,
} = companiesApi;
