export interface IAddANewFAQRequest {
  data: {
    FaqDsrc: string;
    Title: string;
  };
}
export interface IAddNewFAQRespone {
  data: {
    id: number;
    attributes: {
      FaqDsrc: string;
      Title: string;
    };
  };
}

export interface IGetFAQsRespone {
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

export interface IFAQs {
  id: number;
  FaqDsrc: string | null | undefined;
  Title: string | null | undefined;
}
export interface IGetFAQsCustomizeResponse {
  data: IFAQs[] | null;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
