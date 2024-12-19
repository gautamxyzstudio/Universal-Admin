/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  ICustomizedEmployeeApiResponse,
  IDoc,
  IEmployeeAdvance,
  IEmployeeBasic,
  IEmployeeDocument,
  IGetEmployeeApiResponse,
  IGetEmployeeByIdResponse,
  IGetEmployeeCustomResponse,
  IGetEmployeeJobResponse,
  IJobPost,
} from './EmployeeApi.types';
import {
  IDocumentStatus,
  IEmployeeDocsApiKeys,
  IJobTypesEnum,
} from '@/constant/enums';
import { createImageUrl } from '@/utility/cookies';
import { STRINGS } from '@/constant/en';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      ICustomizedEmployeeApiResponse,
      { searchVal: string; pageNo: number }
    >({
      query: ({
        searchVal,
        pageNo,
      }: {
        searchVal: string;
        pageNo: number;
      }) => ({
        url: Endpoints.getEmployees(searchVal, pageNo),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetEmployeeApiResponse
      ): ICustomizedEmployeeApiResponse => {
        const employees: IEmployeeBasic[] = response.data.map((employee) => ({
          id: employee.id,
          name: employee.euser_id?.name,
          selfie: employee?.euser_id
            ? employee?.euser_id?.selfie
              ? createImageUrl(employee.euser_id.selfie[0].url)
              : ''
            : '',
          detailsId: employee.euser_id?.id,
          gender: employee.euser_id?.gender,
          email: employee.euser_id?.email,
          phone: employee.euser_id?.phone,
          sinNo: employee.euser_id?.sinNo,
          securityAdvNo: employee.euser_id?.securityAdvNo,
          securityBasicNo: employee.euser_id?.securityBasicNo,
          workStatus: employee.euser_id?.workStatus,
          docStatus: IDocumentStatus.PENDING,
        }));
        return {
          employees,
          pagination: {
            page: response.meta.page,
            pageSize: response.meta.pageSize,
            total: response.meta.total,
            totalPages: response.meta.totalPages,
          },
        };
      },
    }),
    getEmployeeById: builder.query<IEmployeeAdvance, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: Endpoints.getEmployeesById(id),
        method: ApiMethodType.get,
      }),
      transformResponse: (response: IGetEmployeeByIdResponse) => {
        const selfie: IDoc | null = response.data.attributes?.selfie
          ? {
              url:
                createImageUrl(
                  response.data.attributes?.selfie.data[0].attributes.url
                ) ?? null,
              mime:
                response.data.attributes?.selfie.data[0].attributes.mime ?? '',
              id: response.data.attributes?.selfie.data[0].id ?? 0,
              name:
                response.data.attributes?.selfie.data[0].attributes.name ?? '',
              size:
                response.data.attributes?.selfie.data[0].attributes.size ?? 0,
            }
          : null;
        const documentRequests: IEmployeeDocument[] =
          extractDocumentRequestsFromApiResponse(response);
        const documents: IEmployeeDocument[] =
          extractOtherDocumentsFromApiResponse(response);

        const employee: IEmployeeAdvance = {
          name: response.data.attributes?.name ?? '',
          dob: response.data.attributes?.dob ?? '',
          gender: response.data.attributes?.gender ?? '',
          email: response.data.attributes?.email ?? '',
          phone: response.data.attributes?.phone ?? '',
          city: response.data.attributes?.city ?? '',
          address: response.data.attributes?.address ?? '',
          bankingDetails: {
            bankAccNo: response.data.attributes?.bankAcNo ?? '',
            institutionNumber:
              response.data.attributes?.institutionNumber ?? '',
            transitNumber: response.data.attributes?.trasitNumber ?? '',
            chique: null,
          },
          selfie: selfie,
          id: response.data.id,
          documents: documents,
          update_requests: documentRequests,
        };
        return employee;
      },
    }),
    updateDocumentStatus: builder.mutation<
      any,
      { docId: number; body: { [key: string]: string } }
    >({
      query: ({ docId, body }) => ({
        url: Endpoints.updateDocumentStatus(docId),
        method: ApiMethodType.patch,
        body: body,
      }),
    }),
    updateOtherDocumentStatus: builder.mutation<
      any,
      { docId: number; DocStatus: IDocumentStatus }
    >({
      query: ({ docId, DocStatus }) => ({
        url: Endpoints.updateOtherDocsStatus(docId),
        method: ApiMethodType.patch,
        body: {
          data: {
            Docstatus: DocStatus,
          },
        },
      }),
    }),
    updateOrRejectedDocumentUpdateRequest: builder.mutation<
      any,
      {
        id: number;
        status: IDocumentStatus;
      }
    >({
      query: ({ id, status }) => ({
        url: Endpoints.mutateUpdateDocRequest(id),
        method: ApiMethodType.patch,
        body: {
          status: status,
        },
      }),
    }),
    getEmployeeJobsHistory: builder.query<
      IGetEmployeeCustomResponse,
      { id: number; pageNumber: number }
    >({
      query: ({ id, pageNumber }) => ({
        url: Endpoints.getEmployeeJobHistory(id, pageNumber),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetEmployeeJobResponse
      ): IGetEmployeeCustomResponse => {
        let resp: IGetEmployeeCustomResponse = {
          data: [],
          pagination: undefined,
        };
        const jobs: IJobPost[] = [];
        if (response.data && response.data.length > 0) {
          response.data.forEach((job) => {
            if (job.jobs) {
              jobs.push({
                status: job.status,
                CheckIn: job.CheckIn,
                CheckOut: job.CheckOut,
                id: job.jobs[0]?.id ?? 0,
                job_name: job.jobs[0]?.job_name ?? '',
                city: job.jobs[0]?.city ?? '',
                address: job.jobs[0]?.address ?? '',
                postalCode: job.jobs[0]?.postalCode ?? '',
                postID: job.jobs[0]?.postID ?? '',
                notAccepting: job.jobs[0].notAccepting ?? null,
                gender: job.jobs[0]?.gender ?? '',
                salary: job.jobs[0]?.salary ?? '',
                job_type: job.jobs[0]?.job_type ?? IJobTypesEnum.EVENT,
                location: job.jobs[0]?.location ?? '',
                required_certificates: job.jobs[0]?.required_certificates ?? [],
                eventDate: job.jobs[0]?.eventDate ?? null,
                startShift: job.jobs[0]?.startShift ?? null,
                description: job.jobs[0]?.description ?? '',
                jobDuties: job.jobs[0]?.jobDuties ?? '',
                endShift: job.jobs[0]?.endShift ?? null,
                requiredEmployee: job.jobs[0]?.requiredEmployee ?? null,
                client_details: {
                  clientId: job.jobs[0]?.client_details[0]?.id ?? 0,
                  clientName: job.jobs[0]?.client_details[0]?.Name ?? '',
                  id: job.jobs[0]?.client_details[0]?.company_detail.id ?? 0,
                  companyname:
                    job.jobs[0]?.client_details[0]?.company_detail
                      .companyname ?? '',
                  companyemail:
                    job.jobs[0]?.client_details[0]?.company_detail
                      .companyemail ?? '',
                  companylogo: job.jobs[0]?.client_details[0]?.company_detail
                    .companylogo.url
                    ? createImageUrl(
                        job.jobs[0]?.client_details[0]?.company_detail
                          .companylogo.url
                      )
                    : '',
                },
              });
            }
          });
          resp = {
            data: jobs,
            pagination: response.pagination,
          };
        }
        return resp;
      },
    }),
  }),
});

export const {
  useLazyGetEmployeesQuery,
  useLazyGetEmployeeByIdQuery,
  useUpdateDocumentStatusMutation,
  useLazyGetEmployeeJobsHistoryQuery,
  useUpdateOtherDocumentStatusMutation,
  useUpdateOrRejectedDocumentUpdateRequestMutation,
} = authApi;

const addDocument = (
  document:
    | {
        name: string;
        doc: IDoc;
        id: number;
        key?: IEmployeeDocsApiKeys;
      }
    | undefined,
  isUpdate: boolean,
  status: IDocumentStatus | undefined,
  licenseNo?: string | null | undefined
): IEmployeeDocument | null => {
  return document && status
    ? {
        docName: document.name,
        docStatus: status,
        doc: {
          url: document.doc.url ? createImageUrl(document.doc.url) : null,
          id: document.doc.id,
          name: document.doc.name,
          mime: document.doc.mime,
          size: document.doc.size,
        },
        isUpdate: isUpdate,
        docId: document.id,
        licenseNo:
          status !== IDocumentStatus.PENDING
            ? document.name === STRINGS.license_advance || STRINGS.license_basic
              ? licenseNo
              : undefined
            : undefined,
      }
    : null;
};

export const extractOtherDocumentsFromApiResponse = (
  response: IGetEmployeeByIdResponse
): IEmployeeDocument[] | [] => {
  const documents: IEmployeeDocument[] = [];

  const employeeDetails = response.data.attributes;
  if (employeeDetails && employeeDetails.other_documents) {
    employeeDetails.other_documents.data.forEach((doc) => {
      const document = addDocument(
        {
          name: doc?.attributes?.name ?? '',
          id: doc?.id ?? 0,
          doc: {
            mime: doc?.attributes?.Document?.data?.attributes.mime ?? '',
            url: doc?.attributes?.Document?.data?.attributes.url ?? '',
            size: doc?.attributes?.Document?.data?.attributes.size ?? 0,
            name: doc?.attributes?.Document?.data?.attributes.name ?? '',
          },
        },
        false,
        doc?.attributes?.Docstatus ?? IDocumentStatus.PENDING,
        doc?.attributes?.name === STRINGS.license_advance
          ? employeeDetails.securityAdvNo
          : doc?.attributes?.name === STRINGS.license_basic
          ? employeeDetails.securityBasicNo
          : null
      );
      if (document) documents.push(document);
    });
  }
  return documents;
};

export const extractDocumentRequestsFromApiResponse = (
  response: IGetEmployeeByIdResponse
): IEmployeeDocument[] | [] => {
  const documents: IEmployeeDocument[] = [];
  const employeeDetails = response.data.attributes;
  if (employeeDetails && employeeDetails.document_requests) {
    employeeDetails.document_requests.data.forEach((doc) => {
      const document = addDocument(
        {
          name: doc?.attributes?.name ?? '',
          id: doc?.id ?? 0,

          doc: {
            mime: doc?.attributes?.document?.data?.attributes.mime ?? '',
            url: doc?.attributes?.document?.data?.attributes.url ?? '',
            size: doc?.attributes?.document?.data?.attributes.size ?? 0,
            name: doc?.attributes?.document?.data?.attributes.name ?? '',
          },
        },
        true,
        doc?.attributes?.status ?? IDocumentStatus.PENDING,
        doc?.attributes?.name ?? '' === STRINGS.license_advance
          ? employeeDetails.securityAdvNo
          : doc?.attributes?.name ?? '' === STRINGS.license_basic
          ? employeeDetails.securityBasicNo
          : undefined
      );
      if (document) documents.push(document);
    });
  }
  return documents;
};
