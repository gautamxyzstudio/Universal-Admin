import { IJobPostStatus, IJobTypesEnum } from "@/constant/enums";
import { IJobPost } from "../Employee/EmployeeApi.types";

export interface IAddANewCompanyRequest {
  data: {
    companyname: string;
    companylogo: string;
    companyemail: string;
    location: string;
    contactno: string;
    address: string;
    Industry: string;
    Website: string;
    regNo: string;
    gstNo: string;
  };
}

export interface IAddNewCompanyResponse {
  data: {
    id: number;
    attributes: {
      companyname: string;
      companyemail: string;
      location: string;
      contactno: string;
      address: string;
      Industry: string;
      Website: string;
      regNo: string;
      gstNo: string;
      companylogo: {
        data: {
          attributes: {
            url: string;
          };
        };
      } | null;
    };
  };
}

export interface ICompany {
  id: number;
  sNum: number;
  companyname: string | null | undefined;
  companyemail: string | null | undefined;
  location: string | null | undefined;
  contactno: string | null | undefined;
  address: string | null | undefined;
  companylogo: string | null | undefined;
  Industry: string | null | undefined;
  Website: string | null | undefined;
  regNo: string | null | undefined;
  gstNo: string | null | undefined;
}

export interface IGetCompanyDetailsResponse {
  id: number;
  companyname: string;
  companyemail: string;
  location: string;
  contactno: string;
  address: string;
  Industry: string;
  Website: string;
  regNo: string;
  gstNo: string;
  companylogo: {
    url: string;
  } | null;
}

export interface ICompanyDetails {
  id: number;
  companyname: string | null | undefined;
  companyemail: string | null | undefined;
  location: string | null | undefined;
  contactno: string | null | undefined;
  address: string | null | undefined;
  companylogo: string | null | undefined;
  Industry: string | null | undefined;
  Website: string | null | undefined;
  regNo: string | null | undefined;
  gstNo: string | null | undefined;
}

export interface IGetCompaniesResponse {
  data: {
    id: number;
    attributes: {
      companyname: string;
      companyemail: string;
      location: string;
      contactno: string;
      address: string;
      Industry: string;
      Website: string;
      regNo: string;
      gstNo: string;
      companylogo: {
        data: {
          attributes: {
            url: string;
          };
        };
      } | null;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IGetCompaniesCustomizedResponse {
  data: ICompany[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export interface IJobPostTypes {
  id: number;
  job_name: string;
  required_certificates: string[] | null;
  city: string;
  address: string;
  postalCode: string;
  postID?: number | null;
  gender: string;
  salary: string;
  notAccepting?: boolean;
  jobDuties: string;
  job_type: IJobTypesEnum;
  publishedAt?: Date | string;
  location: string;
  description: string;
  eventDate: Date;
  endShift: Date;
  requiredEmployee?: number;
  status: IJobPostStatus;
  startShift: Date;
  client_details?: {
    id: number;
    Name: string;
    companyname: string;
    Industry: string;
    Email: string;
    location: string;
    company_detail?: {
      companyname: string;
      id: number;
      companylogo:
        | {
            url: string | null;
            mime: string | null;
            id: number;
            name: string;
            size: number | null;
          }
        | null
        | undefined;
    } | null;
  } | null;
}

export interface IJobPostCustomizedResponse {
  data: IJobPost[] | null;
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

export type IGetPostedJobsResponse = {
  data: {
    id: number | null | undefined;
    job_name: string | null | undefined;
    city: string | null | undefined;
    address: string | null | undefined;
    postalCode: string | null | undefined;
    postID: string | null | undefined;
    gender: string | null | undefined;
    salary: string | null | undefined;
    job_type: IJobTypesEnum | null | undefined;
    location: string | null | undefined;
    required_certificates: string[] | null | undefined;
    startShift: Date | null | undefined;
    eventDate: Date | null | undefined;
    description: string | null | undefined;
    jobDuties: string | null | undefined;
    status: IJobPostStatus | null | undefined;
    endShift: Date | null | undefined;
    requiredEmployee: number | null | undefined;
    notAccepting: boolean | null | undefined;
    updatedAt: Date | null | undefined;
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
  }[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export interface IGetCompanyClientResponse {
  data: {
    id: number;
    attributes: {
      id: number;
      Name: string | null | undefined;
      Email: string | null | undefined;
      location: string | null | undefined;
      contactno: string | null | undefined;
      publishedAt: Date | null | undefined;
      company_detail: {
        Industry: string | null | undefined;
        companyname: string | null | undefined;
      };
    };
  }[];
}

export interface IGetCustomizeCompanyClientResponse {
  data: ICompanyClientDetails[] | null;
}
export interface ICompanyClientDetails {
  id: number;
  clientName: string | null | undefined;
  clientEmail: string | null | undefined;
  clientLocation: string | null | undefined;
  clientContactno: string | null | undefined;
  joinDate: Date | string | null | undefined;
  clientCompanyName: string | null | undefined;
  clientCompanyIndustry: string | null | undefined;
}

export interface IAddNewJobPostRequest {
  job_name: string;
  required_certificates: string[] | null;
  city: string;
  address: string;
  postalCode: string;
  gender: string;
  eventDate: Date;
  salary: string;
  jobDuties: string;
  job_type: IJobTypesEnum;
  location: string;
  requiredEmployee: number;
  startShift: Date;
  endShift: Date;
  description: string;
}
