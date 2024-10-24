import { ICompany } from '@/api/fetures/Company/Company.types';

export type IAddCompanyFormProps = {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  onAddCompanyHandler: (company: ICompany) => void;
};

export type IAddCompanyState = {
  logo: string;
  companyName: string;
  accRequestName: string;
  industry: string;
  email: string;
  contactNumber: string;
  address: string;
  companyRegistrationNumber: string;
  gstNumber: string;
  websiteName: string;
  companyNameError: string;
  accRequestNameError: string;
  industryError: string;
  emailError: string;
  contactNumberError: string;
  addressError: string;
  companyRegistrationNumberError: string;
  gstNumberError: string;
};

export enum CompanyStateFields {
  logo = 'logo',
  companyName = 'companyName',
  accRequestName = 'accRequestName',
  industry = 'industry',
  email = 'email',
  contactNumber = 'contactNumber',
  address = 'address',
  companyRegistrationNumber = 'companyRegistrationNumber',
  gstNumber = 'gstNumber',
  websiteName = 'websiteName',
}
