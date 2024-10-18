import { IAdmin } from '../Auth/types';

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
