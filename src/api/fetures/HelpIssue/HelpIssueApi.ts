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
} from "./HelpIssueApi.types";
import { createImageUrl } from "@/utility/cookies";

const HelpIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHelpIssuesByEmp: builder.query<
      ICustomizedIssueRaisedByEmpApiResponse,
      { searchVal: string, page: number}
    >({
      query: ({ searchVal , page}: { searchVal: string, page: number }) => ({
        url: Endpoints.getHelpSupportIssueByEmployee(searchVal, page),
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
              employeeName: issue.employee_detail?.name,
              employeeEmail: issue.employee_detail?.email,
              employeePhone: issue.employee_detail?.phone,
              employeeId: issue.employee_detail?.id,
              employeeImageUrl: issue.employee_detail?.selfie.url
                ? createImageUrl(issue.employee_detail?.selfie.url)
                : "",
            });
          });
        }
        console.log(issueResponse, "issueResponse");
        return {
          data: issueResponse,
          pagination: {
            page: response.pagination.page,
            pageSize: response.pagination.pageSize,
            pageCount: response.pagination.pageCount,
            totalPages: response.pagination.total,
          },
        };
      },
    }),
    getHelpIssuesByClient: builder.query<
      ICustomizedIssueRaisedByClientApiResponse,
      { searchVal: string, page: number }
    >({
      query: ({ searchVal, page }: { searchVal: string, page:number }) => ({
        url: Endpoints.getHelpSupportIssueByClient(searchVal, page),
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
            pageCount: response.pagination.pageCount,
            totalPages: response.pagination.total,
          }
        };
      },
    }),
  }),
});
export const { useGetHelpIssuesByEmpQuery, useLazyGetHelpIssuesByEmpQuery, useGetHelpIssuesByClientQuery, useLazyGetHelpIssuesByClientQuery } =
  HelpIssueApi;
