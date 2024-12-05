import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  ICustomizedIssueRaisedApiResponse,
  IGetIssueRaisedApiResponse,
  IIssueRaisedByEmployee,
} from "./HelpIssueApi.types";

const HelpIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHelpIssues: builder.query<
      ICustomizedIssueRaisedApiResponse,
      { searchVal: string; pageNo: number }
    >({
      query: ({
        searchVal,
        pageNo,
      }: {
        searchVal: string;
        pageNo: number;
      }) => ({
        url: Endpoints.getHelpSupportIssue(searchVal, pageNo),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetIssueRaisedApiResponse
      ): ICustomizedIssueRaisedApiResponse => {
        const issueResponse: IIssueRaisedByEmployee[] = [];
if(response.data){
    response.data.forEach((issue) => {
      issueResponse.push({
        id: issue.id,
        issue: issue.attributes?.Issue,
        publishedAt: issue.attributes.publishedAt,
        issueStatus: issue.attributes.status,
        employeeName: issue.attributes.employee_detail?.data?.attributes?.name,
        employeeEmail: issue.attributes.employee_detail?.data?.attributes?.email,
        employeePhone: issue.attributes.employee_detail?.data?.attributes?.phone,
        employeeId: issue.attributes.employee_detail?.data?.id,
      });
    });
  
}
        return {
          data: issueResponse,
          pagination: {
            page: response.meta.pagination.page,
            pageSize: response.meta.pagination.pageSize,
            total: response.meta.pagination.total,
            totalPages: response.meta.pagination.totalPages,
          },
        };
      },
    }),
  }),
});
export const { useGetHelpIssuesQuery, useLazyGetHelpIssuesQuery } =
  HelpIssueApi;
