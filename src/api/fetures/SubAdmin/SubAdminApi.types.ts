export interface IAddNewSubAdminRequest {
  username: string;
  email: string;
  password: string;
  UserNameFL: string;
  UserStatus: boolean;
  user_type: 'subAdmin';
  phoneNumber: string;
}

export interface ISubAdmin {
  id: number;
  username: string;
  email: string;
  user_type: 'subAdmin';
  name: string;
  UserNameFL: string;
  phoneNumber: string;
  UserStatus: boolean;
}

export interface IAddNewSubAdminResponse {
  jwt: string;
  user: ISubAdmin;
}

export interface IUpdateSubAdminResponse {
  data: ISubAdmin;
}

export interface IUpdateSubAdminRequestBody {
  subAdminId: number;
  body: Partial<IAddNewSubAdminRequest>;
}

export interface IGetSubAdminResponse {
  results: ISubAdmin[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
