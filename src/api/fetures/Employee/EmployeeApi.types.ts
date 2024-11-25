import {
  IDocumentStatus,
  IEmployeeApiKeyStatus,
  IEmployeeDocsApiKeys,
} from '@/constant/enums';

export interface IGetEmployeeApiResponse {
  data: {
    id: number;
    email: string;
    euser_id: {
      id: number;
      name: string;
      gender: string;
      email: string;
      phone: string;
      sinNo: string;
      workStatus: string;
      selfie:
        | {
            url: string;
          }[]
        | null;
    };
  }[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface IEmployeeBasic {
  id: number;
  name: string;
  selfie: string;
  detailsId: number;
  gender: string;
  email: string;
  phone: string;
  sinNo: string;
  workStatus: string;
  docStatus: IDocumentStatus;
}

export interface ICustomizedEmployeeApiResponse {
  employees: IEmployeeBasic[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface IEmployeeAdvance {
  id: number;
  name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  city: string;
  selfie: IDoc | null;
  address: string;
  bankingDetails: {
    bankAccNo: string;
    institutionNumber: string;
    transitNumber: string;
    chique: IEmployeeDocument;
  };
  documents: IEmployeeDocument[];
  otherDocuments: IEmployeeDocument[];
}

export type IDoc = {
  url: string | null;
  mime?: string;
  id?: number;
  name: string;
  size?: number;
};

export interface IEmployeeDocument {
  docName: string;
  docStatus: IDocumentStatus;
  docStatusKey: IEmployeeApiKeyStatus;
  doc: IDoc | null;
  docId: number | null;
  apiKey?: IEmployeeDocsApiKeys;
}

export interface IGetEmployeeByIdResponse {
  data: {
    id: number;
    attributes:
      | {
          name: string | null | undefined;
          dob: string | null | undefined;
          gender: string | null | undefined;
          email: string | null | undefined;
          phone: string | null | undefined;
          city: string | null | undefined;
          address: string | null | undefined;
          bankAcNo: string | null | undefined;
          institutionNumber: string | null | undefined;
          trasitNumber: string | null | undefined;
          govtidStaus: IDocumentStatus | null | undefined;
          directDepositVoidChequeStatus: IDocumentStatus | null | undefined;
          sinDocumentStatus: IDocumentStatus | null | undefined;
          securityDocBasicStatus: IDocumentStatus | null | undefined;
          supportingDocumentStatus: IDocumentStatus | null | undefined;
          securityDocumentAdvStatus: IDocumentStatus | null | undefined;
          other_documents: {
            data: [
              | {
                  id: number;
                  attributes:
                    | {
                        name: string | null | undefined;
                        Docstatus: IDocumentStatus | null | undefined;
                        Document:
                          | {
                              data:
                                | {
                                    attributes: {
                                      url: string | null | undefined;
                                      mime: string | null | undefined;
                                      size: number | null | undefined;
                                      name: string | null | undefined;
                                    };
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined
            ];
          };
          govtid:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
          selfie:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
          directDepositVoidCheque:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
          supportingDocument:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
          sinDocument:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
          securityDocumentAdv:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
          securityDocumentBasic:
            | {
                data: {
                  id: number;
                  attributes: {
                    url: string | null | undefined;
                    mime: string | null | undefined;
                    size: number | null | undefined;
                    name: string | null | undefined;
                  };
                };
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
}
