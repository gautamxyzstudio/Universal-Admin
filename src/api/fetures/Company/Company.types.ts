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
