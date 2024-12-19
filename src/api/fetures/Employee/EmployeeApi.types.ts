import {
  IDocumentStatus,
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
      securityAdvNo: string | null;
      securityBasicNo: string | null;
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
  securityAdvNo: string | null;
  securityBasicNo: string | null;
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
    chique: IEmployeeDocument | null;
  };
  documents: IEmployeeDocument[];
  update_requests: IEmployeeDocument[];
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
  isUpdate?: boolean;
  doc: IDoc | null;
  docId: number | null;
  licenseNo?: string | null | undefined;
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
          securityAdvNo: string | null | undefined;
          securityBasicNo: string | null | undefined;
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
          document_requests: {
            data: [
              | {
                  id: number;
                  attributes:
                    | {
                        name: string | null | undefined;
                        status: IDocumentStatus | null | undefined;
                        document:
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
