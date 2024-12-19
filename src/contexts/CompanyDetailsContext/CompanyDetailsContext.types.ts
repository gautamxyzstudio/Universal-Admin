import { ICompany } from "@/api/fetures/Company/Company.types";

export interface ICompanyDetailsContextProviderProps {
  children: React.ReactNode;
}
export interface ICompanyDetailsContextProps {
  onClickRow: ( companyDetail?: ICompany) => void;
  companyDetail: ICompany | null;
}
