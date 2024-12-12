import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  ICustomizedIssueRaisedByEmpApiResponse,
  ICustomizedIssueRaisedByClientApiResponse,
  IGetIssueRaisedByEmpApiResponse,
  IGetIssueRaisedByClientApiResponse,
  IIssueRaisedByClient,
  IIssueRaisedByEmployee,
  IGetIssueRaisedByIdApiResponse,
  IIssueRaisedById,
} from "./HelpIssueApi.types";
import { createImageUrl } from "@/utility/cookies";
import { IIssueRaisedStatusEnum } from "@/constant/enums";

const HelpIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHelpIssuesByEmp: builder.query<
      ICustomizedIssueRaisedByEmpApiResponse,
      { searchVal: string; page: number; status?: IIssueRaisedStatusEnum }
    >({
      query: ({
        searchVal,
        page,
        status,
      }: {
        searchVal: string;
        page: number;
        status: IIssueRaisedStatusEnum;
      }) => ({
        url: Endpoints.getHelpSupportIssueByEmployee(searchVal, page, status),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetIssueRaisedByEmpApiResponse
      ): ICustomizedIssueRaisedByEmpApiResponse => {
        const issueResponse: IIssueRaisedByEmployee[] = [];
        if (response.data) {
          response.data.forEach((issue) => {
            issueResponse.push({
              id: issue.id,
              issue: issue.Issue,
              publishedAt: issue.publishedAt,
              issueStatus: issue.status,
              isRead: issue.isRead,
              employeeName: issue.employee_detail?.name,
              employeeEmail: issue.employee_detail?.email,
              employeePhone: issue.employee_detail?.phone,
              employeeId: issue.employee_detail?.id,
              employeeImageUrl: issue.employee_detail?.selfie?.[0]?.url
                ? createImageUrl(issue.employee_detail?.selfie?.[0]?.url)
                : "",
            });
          });
        }
        return {
          data: issueResponse,
          pagination: {
            page: response.pagination.page,
            pageSize: response.pagination.pageSize,
            totalPages: response.pagination.pageCount,
            total: response.pagination.total,
          },
        };
      },
    }),
    getHelpIssuesByClient: builder.query<
      ICustomizedIssueRaisedByClientApiResponse,
      { searchVal: string; page: number; status?: IIssueRaisedStatusEnum }
    >({
      query: ({
        searchVal,
        page,
        status,
      }: {
        searchVal: string;
        page: number;
        status: IIssueRaisedStatusEnum;
      }) => ({
        url: Endpoints.getHelpSupportIssueByClient(searchVal, page, status),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetIssueRaisedByClientApiResponse
      ): ICustomizedIssueRaisedByClientApiResponse => {
        const issueResponseByClient: IIssueRaisedByClient[] = [];
        if (response) {
          response.data.forEach((issue) => {
            issueResponseByClient.push({
              id: issue.id,
              issue: issue.Issue,
              publishedAt: issue.publishedAt,
              issueStatus: issue.status,
              isRead: issue.isRead,
              clientName: issue.client_detail?.Name,
              clientEmail: issue.client_detail?.Email,
              clientPhone: issue.client_detail?.contactno,
              clientId: issue.client_detail?.id,
              clientCompanyName:
                issue.client_detail?.company_detail?.companyname,
              clientCompanyLogoUrl: issue.client_detail?.company_detail
                ?.companylogo
                ? createImageUrl(
                    issue.client_detail?.company_detail?.companylogo?.url
                  )
                : "",
            });
          });
        }
        return {
          data: issueResponseByClient,
          pagination: {
            page: response.pagination.page,
            pageSize: response.pagination.pageSize,
            totalPages: response.pagination.pageCount,
            total: response.pagination.total,
          },
        };
      },
    }),
    getIssueRaisedById: builder.query({
      query: (messageId: number) => ({
        url: Endpoints.getIssueRaisedById(messageId),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetIssueRaisedByIdApiResponse
      ): IIssueRaisedById => {
        return {
          id: response.id,
          issue: response.Issue,
          publishedAt: response.publishedAt ?? null,
          issueStatus: response.status,
          user_type: response.user_type ?? null,
          isRead: response.isRead,
          employeeDetails: response?.employee_detail
            ? {
                employeeId: response.employee_detail?.id,
                employeeName: response.employee_detail?.name,
                employeeEmail: response.employee_detail?.email,
                employeePhone: response.employee_detail?.phone,
                employeeImageUrl: response.employee_detail?.selfie?.[0]?.url
                  ? createImageUrl(response.employee_detail?.selfie?.[0]?.url)
                  : null,
              }
            : null,
          clientDetails: response.client_detail
            ? {
                clientId: response.client_detail?.id,
                clientName: response.client_detail?.Name,
                clientEmail: response.client_detail?.Email,
                clientPhone: response.client_detail?.contactno,
                clientCompanyName:
                  response.client_detail?.company_detail?.companyname,
                clientCompanyLogoUrl: response.client_detail?.company_detail
                  ?.companylogo
                  ? createImageUrl(
                      response.client_detail?.company_detail?.companylogo?.url
                    )
                  : null,
              }
            : null,
        };
      },
    }),
    updateIssueResolve: builder.mutation({
      query: (issueId: number) => ({
        url: Endpoints.updateIssueStatusIsResolveById(issueId),
        method: ApiMethodType.patch,
      }),
    }),
    updateNotAnIssue: builder.mutation({
      query: (issueId: number) => ({
        url: Endpoints.updateIssueStatusIsNotAnIssueById(issueId),
        method: ApiMethodType.patch,
      }),
    }),
  }),
});
export const {
  useGetHelpIssuesByEmpQuery,
  useLazyGetHelpIssuesByEmpQuery,
  useGetHelpIssuesByClientQuery,
  useLazyGetHelpIssuesByClientQuery,
  useGetIssueRaisedByIdQuery,
  useLazyGetIssueRaisedByIdQuery,
  useUpdateIssueResolveMutation,
  useUpdateNotAnIssueMutation,
} = HelpIssueApi;
