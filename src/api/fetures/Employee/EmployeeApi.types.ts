import {
  IDocumentStatus,
  IEmployeeApiKeyStatus,
  IEmployeeDocsApiKeys,
  IJobPostStatus,
  IJobTypesEnum,
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
                                    id: number;
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

export interface IJobPost {
  status: IJobPostStatus;
  CheckIn: Date | null;
  CheckOut: Date | null;
  id: number;
  job_name: string;
  city: string;
  address: string;
  postalCode: string;
  postID: string;
  gender: string;
  salary: string;
  job_type: IJobTypesEnum;
  location: string;
  required_certificates: string[] | null;
  eventDate: Date | null | string;
  startShift: Date | null | string;
  description: string;
  jobDuties: string;
  endShift: Date | null | string;
  requiredEmployee: number | null;
  notAccepting: boolean | null;
  client_details: {
    id: number;
    companyname: string;
    clientId: number;
    clientName: string;
    companyemail: string;
    companylogo: string;
  } | null;
}

export interface IGetEmployeeCustomResponse {
  data: IJobPost[];
  pagination:
    | {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    | null
    | undefined;
}

export interface IGetEmployeeJobResponse {
  data: {
    status: IJobPostStatus;
    CheckIn: Date | null;
    CheckOut: Date | null;
    jobs:
      | {
          id: number;
          job_name: string | null | undefined;
          city: string | null | undefined;
          address: string | null | undefined;
          postalCode: string | null | undefined;
          postID: string | null | undefined;
          notAccepting: boolean | null | undefined;
          gender: string | null | undefined;
          salary: string | null | undefined;
          job_type: IJobTypesEnum | null | undefined;
          location: string | null | undefined;
          required_certificates: string[] | null | undefined;
          eventDate: Date | null | undefined;
          startShift: Date | null | undefined;
          description: string | null | undefined;
          jobDuties: string | null | undefined;
          endShift: Date | null | undefined;
          requiredEmployee: number | null | undefined;
          client_details:
            | {
                id: number | null | undefined;
                Name: string | null | undefined;
                company_detail: {
                  id: number | null | undefined;
                  companyname: string | null | undefined;
                  companyemail: string | null | undefined;
                  companylogo: {
                    url: string | null | undefined;
                  };
                };
              }[];
        }[]
      | null;
  }[];
  pagination:
    | {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    | null
    | undefined;
}
