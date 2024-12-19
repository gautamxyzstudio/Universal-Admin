export interface IAddANewFAQRequest {
  data: {
    FaqDsrc: string;
    Title: string;
  };
}
export interface IAddNewFAQResponse {
  data: {
    id: number;
    attributes: {
      FaqDsrc: string;
      Title: string;
    };
  };
}

export interface IGetFAQsResponse {
  data: {
    id: number;
    attributes: {
      FaqDsrc: string;
      Title: string;
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

export interface IFaqs {
  id: number;
  description: string | null | undefined;
  title: string | null | undefined;
}
export interface IGetFAQsCustomizeResponse {
  data: IFaqs[] ;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
