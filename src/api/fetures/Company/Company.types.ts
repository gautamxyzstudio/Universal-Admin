import { IJobPostStatus } from "@/constant/enums";

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
  job_type: string;
  publishedAt: Date;
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
  data: IJobPostTypes[] | null;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
}

export type IPostedJobsResponse = {
  data: {
    id: number;
    job_name: string;
    required_certificates: string[] | null;
    city: string;
    address: string;
    postalCode: string;
    gender: string;
    eventDate: Date;
    salary: string;
    createdAt: Date;
    notAccepting: boolean;
    updatedAt: Date;
    status: IJobPostStatus;
    publishedAt: Date;
    jobDuties: string;
    job_type: string;
    location: string;
    requiredEmployee: number;
    startShift: Date;
    endShift: Date;
    description: string;
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
    }[];
  }[];

  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } | null;
};
