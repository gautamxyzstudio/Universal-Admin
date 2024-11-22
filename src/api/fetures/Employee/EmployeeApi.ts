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
} from './EmployeeApi.types';
import {
  IDocumentStatus,
  IEmployeeApiKeyStatus,
  IEmployeeDocsApiKeys,
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
        };
        return employee;
      },
    }),
    updateDocumentStatus: builder.mutation<
      any,
      { docId: number; key: IEmployeeApiKeyStatus; docStatus: IDocumentStatus }
    >({
      query: ({ docId, key, docStatus }) => ({
        url: Endpoints.updateDocumentStatus(docId),
        method: ApiMethodType.patch,
        body: {
          [key]: docStatus,
        },
      }),
    }),
  }),
});

export const {
  useLazyGetEmployeesQuery,
  useLazyGetEmployeeByIdQuery,
  useUpdateDocumentStatusMutation,
} = authApi;

//to formmat employee documents
export const extractEmployeeDocumentsFromApiResponse = (
  response: IGetEmployeeByIdResponse
): IEmployeeDocument[] | [] => {
  //to merge doc details into one
  const addDocument = (
    document:
      | {
          name: string;
          doc: IDoc;
          id: number;
          key: IEmployeeDocsApiKeys;
          docStatusKey: IEmployeeApiKeyStatus;
        }
      | undefined,
    status: IDocumentStatus | undefined
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
          docId: document.id,
          apiKey: document.key,
        }
      : null;
  };
  const documents: IEmployeeDocument[] = [];
  const employeeDetails = response.data.attributes;

  if (employeeDetails && employeeDetails.sinDocument) {
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
      employeeDetails.sinDocumentStatus ?? IDocumentStatus.PENDING
    );
    sinDocument && documents.push(sinDocument);
  }
  if (employeeDetails && employeeDetails.govtid) {
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
      employeeDetails.govtidStaus ?? IDocumentStatus.PENDING
    );
    govtID && documents.push(govtID);
  }
  if (employeeDetails && employeeDetails.supportingDocument) {
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
      employeeDetails.supportingDocumentStatus ?? IDocumentStatus.PENDING
    );
    supportingDocument && documents.push(supportingDocument);
  }

  if (employeeDetails && employeeDetails.securityDocumentAdv) {
    const securityDocumentAdv = addDocument(
      {
        name: STRINGS.license_advance,
        id: employeeDetails.securityDocumentAdv.data.id,
        docStatusKey: IEmployeeApiKeyStatus.LICENSE_ADVANCE,
        doc: {
          mime: employeeDetails.securityDocumentAdv.data.attributes?.mime ?? '',
          url: employeeDetails.securityDocumentAdv.data.attributes?.url ?? '',
          size: employeeDetails.securityDocumentAdv.data.attributes?.size ?? 0,
          name: employeeDetails.securityDocumentAdv.data.attributes?.name ?? '',
        },
        key: IEmployeeDocsApiKeys.LICENSE_ADVANCE,
      },
      employeeDetails.securityDocumentAdvStatus ?? IDocumentStatus.PENDING
    );
    securityDocumentAdv && documents.push(securityDocumentAdv);
  }
  if (employeeDetails && employeeDetails.securityDocumentBasic) {
    const securityDocumentBasic = addDocument(
      {
        name: STRINGS.license_advance,

        id: employeeDetails.securityDocumentBasic.data.id,
        docStatusKey: IEmployeeApiKeyStatus.LICENSE_BASIC,
        doc: {
          mime:
            employeeDetails.securityDocumentBasic.data.attributes?.mime ?? '',
          url: employeeDetails.securityDocumentBasic.data.attributes?.url ?? '',
          size:
            employeeDetails.securityDocumentBasic.data.attributes?.size ?? 0,
          name:
            employeeDetails.securityDocumentBasic.data.attributes?.name ?? '',
        },
        key: IEmployeeDocsApiKeys.LICENSE_ADVANCE,
      },
      employeeDetails.securityDocBasicStatus ?? IDocumentStatus.PENDING
    );
    securityDocumentBasic && documents.push(securityDocumentBasic);
  }

  return documents;
};
