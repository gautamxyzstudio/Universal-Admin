import { ICompany } from '@/api/fetures/Company/Company.types';

export interface IAddCompanyListProps {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  onSelectCompany: (company: ICompany) => void;
}
