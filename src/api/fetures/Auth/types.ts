export type ILoginArgs = {
  identifier: string;
  password: string;
};

export interface ILoginApiResponse {
  jwt: string;
  user: IAdmin;
}

export interface IAdmin {
  id: number;
  username: string;
  email: string;
  user_type: 'SuperAdmin' | 'subAdmin' | null;
  name: string;
  photo: string | null;
  phone: string | null;
}