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
  IDocumentNames,
  IDocumentStatus,
  IEmployeeApiKeyStatus,
  IEmployeeDocsApiKeys,
  IJobTypesEnum,
} from '@/constant/enums';
import { createImageUrl } from '@/utility/cookies';
import { STRINGS } from '@/constant/en';
import { getDocumentNameFromCode } from '@/utility/utils';

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

        const documents: IEmployeeDocument[] =
          extractEmployeeDocumentsFromApiResponse(response);
        const documentRequests: IEmployeeDocument[] =
          extractDocumentRequestsFromApiResponse(response);
        const secondaryDocuments: IEmployeeDocument[] =
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
            chique: {
              docName:
                response.data.attributes?.directDepositVoidCheque?.data
                  ?.attributes?.name ?? '',
              docStatusKey: IEmployeeApiKeyStatus.CHEQUE,
              docStatus:
                response.data.attributes?.directDepositVoidChequeStatus ??
                IDocumentStatus.PENDING,
              doc: {
                url: response.data.attributes?.directDepositVoidCheque?.data
                  .attributes.url
                  ? createImageUrl(
                      response.data.attributes?.directDepositVoidCheque?.data
                        .attributes.url
                    )
                  : null,
                mime:
                  response.data.attributes?.directDepositVoidCheque?.data
                    .attributes.mime ?? '',
                id:
                  response.data.attributes?.directDepositVoidCheque?.data.id ??
                  0,
                name:
                  response.data.attributes?.directDepositVoidCheque?.data
                    .attributes.name ?? '',
                size:
                  response.data.attributes?.directDepositVoidCheque?.data
                    .attributes.size ?? 0,
              },
              docId:
                response.data.attributes?.directDepositVoidCheque?.data?.id ??
                0,
            },
          },
          selfie: selfie,
          id: response.data.id,
          documents: documents,
          otherDocuments: secondaryDocuments,
          documentRequests: documentRequests,
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
        docStatusKey: IEmployeeApiKeyStatus;
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
        docStatusKey: document.docStatusKey,
        doc: {
          url: document.doc.url ? createImageUrl(document.doc.url) : null,
          id: document.doc.id,
          name: document.doc.name,
          mime: document.doc.mime,
          size: document.doc.size,
        },
        isUpdate: isUpdate,
        docId: document.id,
        apiKey: document.key,
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
          docStatusKey: IEmployeeApiKeyStatus.NULL,
          doc: {
            mime: doc?.attributes?.Document?.data?.attributes.mime ?? '',
            url: doc?.attributes?.Document?.data?.attributes.url ?? '',
            size: doc?.attributes?.Document?.data?.attributes.size ?? 0,
            name: doc?.attributes?.Document?.data?.attributes.name ?? '',
          },
        },
        false,
        doc?.attributes?.Docstatus ?? IDocumentStatus.PENDING
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
          name: getDocumentNameFromCode(
            doc?.attributes?.DocName ?? IDocumentNames.NULL
          ),
          id: doc?.id ?? 0,
          docStatusKey: IEmployeeApiKeyStatus.NULL,
          doc: {
            mime: doc?.attributes?.document?.data?.attributes.mime ?? '',
            url: doc?.attributes?.document?.data?.attributes.url ?? '',
            size: doc?.attributes?.document?.data?.attributes.size ?? 0,
            name: doc?.attributes?.document?.data?.attributes.name ?? '',
          },
        },
        true,
        doc?.attributes?.status ?? IDocumentStatus.PENDING,
        getDocumentNameFromCode(
          doc?.attributes?.DocName ?? IDocumentNames.NULL
        ) === STRINGS.license_advance
          ? employeeDetails.securityAdvNo
          : getDocumentNameFromCode(
              doc?.attributes?.DocName ?? IDocumentNames.NULL
            ) === STRINGS.license_basic
          ? employeeDetails.securityBasicNo
          : undefined
      );
      if (document) documents.push(document);
    });
  }
  return documents;
};

//to format employee documents
export const extractEmployeeDocumentsFromApiResponse = (
  response: IGetEmployeeByIdResponse
): IEmployeeDocument[] | [] => {
  //to merge doc details into one

  const documents: IEmployeeDocument[] = [];
  const employeeDetails = response.data.attributes;

  if (
    employeeDetails &&
    employeeDetails.sinDocument &&
    employeeDetails.sinDocument?.data?.id
  ) {
    const sinDocument = addDocument(
      {
        name: STRINGS.sinDocument,
        id: employeeDetails.sinDocument.data.id,
        docStatusKey: IEmployeeApiKeyStatus.SIN_DOCUMENT,
        doc: {
          mime: employeeDetails.sinDocument.data.attributes?.mime ?? '',
          url: employeeDetails.sinDocument.data.attributes?.url ?? '',
          size: employeeDetails.sinDocument.data.attributes?.size ?? 0,
          name: employeeDetails.sinDocument.data.attributes?.name ?? '',
        },
        key: IEmployeeDocsApiKeys.SIN_DOCUMENT,
      },
      false,
      employeeDetails.sinDocumentStatus ?? IDocumentStatus.PENDING
    );
    sinDocument && documents.push(sinDocument);
  }
  if (
    employeeDetails &&
    employeeDetails.govtid &&
    employeeDetails.govtid?.data?.id
  ) {
    const govtID = addDocument(
      {
        name: STRINGS.Govt_ID,
        id: employeeDetails.govtid.data.id,
        docStatusKey: IEmployeeApiKeyStatus.GOVT_ID,
        doc: {
          mime: employeeDetails.govtid.data.attributes?.mime ?? '',
          url: employeeDetails.govtid.data.attributes?.url ?? '',
          size: employeeDetails.govtid.data.attributes?.size ?? 0,
          name: employeeDetails.govtid.data.attributes?.name ?? '',
        },
        key: IEmployeeDocsApiKeys.GOVT_ID,
      },
      false,
      employeeDetails.govtidStaus ?? IDocumentStatus.PENDING
    );
    govtID && documents.push(govtID);
  }
  if (
    employeeDetails &&
    employeeDetails.supportingDocument &&
    employeeDetails.supportingDocument?.data?.id
  ) {
    const supportingDocument = addDocument(
      {
        name: STRINGS.document,
        id: employeeDetails.supportingDocument.data.id,
        docStatusKey: IEmployeeApiKeyStatus.SUPPORTING_DOCUMENT,
        doc: {
          mime:
            employeeDetails?.supportingDocument?.data.attributes?.mime ?? '',
          url: employeeDetails?.supportingDocument?.data?.attributes?.url ?? '',
          size:
            employeeDetails?.supportingDocument?.data?.attributes?.size ?? 0,
          name:
            employeeDetails?.supportingDocument?.data?.attributes?.name ?? '',
        },
        key: IEmployeeDocsApiKeys.SUPPORTING_DOCUMENT,
      },
      false,
      employeeDetails.supportingDocumentStatus ?? IDocumentStatus.PENDING
    );
    supportingDocument && documents.push(supportingDocument);
  }
  if (
    employeeDetails &&
    employeeDetails.securityDocumentAdv &&
    employeeDetails.securityDocumentAdv?.data?.id
  ) {
    const securityDocumentAdv = addDocument(
      {
        name: STRINGS.license_advance,
        id: employeeDetails?.securityDocumentAdv?.data?.id ?? 0,
        docStatusKey: IEmployeeApiKeyStatus.LICENSE_ADVANCE,
        doc: {
          mime:
            employeeDetails?.securityDocumentAdv?.data?.attributes?.mime ?? '',
          url:
            employeeDetails?.securityDocumentAdv?.data?.attributes?.url ?? '',
          size:
            employeeDetails?.securityDocumentAdv?.data?.attributes?.size ?? 0,
          name:
            employeeDetails?.securityDocumentAdv?.data?.attributes?.name ?? '',
        },
        key: IEmployeeDocsApiKeys.LICENSE_ADVANCE,
      },
      false,
      employeeDetails.securityDocumentAdvStatus ?? IDocumentStatus.PENDING,
      employeeDetails.securityAdvNo
    );
    securityDocumentAdv && documents.push(securityDocumentAdv);
  }
  if (
    employeeDetails &&
    employeeDetails.securityDocumentBasic &&
    employeeDetails.securityDocumentBasic?.data?.id
  ) {
    const securityDocumentBasic = addDocument(
      {
        name: STRINGS.license_basic,

        id: employeeDetails?.securityDocumentBasic?.data?.id ?? 0,
        docStatusKey: IEmployeeApiKeyStatus.LICENSE_BASIC,
        doc: {
          mime:
            employeeDetails?.securityDocumentBasic?.data?.attributes?.mime ??
            '',
          url:
            employeeDetails?.securityDocumentBasic?.data?.attributes?.url ?? '',
          size:
            employeeDetails?.securityDocumentBasic?.data?.attributes?.size ?? 0,
          name:
            employeeDetails?.securityDocumentBasic?.data?.attributes?.name ??
            '',
        },
        key: IEmployeeDocsApiKeys.LICENSE_ADVANCE,
      },
      false,
      employeeDetails.securityDocBasicStatus ?? IDocumentStatus.PENDING,
      employeeDetails.securityBasicNo
    );
    securityDocumentBasic && documents.push(securityDocumentBasic);
  }

  return documents;
};
