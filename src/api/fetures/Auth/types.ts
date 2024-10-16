export type ILoginArgs = {
  identifier: string;
  password: string;
};

export interface ILoginApiResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    user_type: null;
  } | null;
}
