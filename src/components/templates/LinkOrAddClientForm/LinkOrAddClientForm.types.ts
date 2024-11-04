import { IClient } from '@/api/fetures/Client/Client.types';
import { ICompany } from '@/api/fetures/Company/Company.types';
import { IAddEmployeeClientArgs } from '@/app/(home)/clientManagement/[pendingRequests]/types';
import { IClientStatus } from '@/constant/enums';

export type ILinkClientFrom = {
  clientName: string;
  companyName: string;
  industry: string;
  email: string;
  status?: IClientStatus;
  contactNumber: string;
  location: string;
  clientNameError: string;
  companyNameError: string;
  industryError: string;
  emailError: string;
  password?: string;
  passwordError?: string;
  contactNumberError: string;
  showPassword: boolean;
  locationError: string;
};

export interface ILinkOrAddClientFrom {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  onDeselectCompany: () => void;
  onPressLinkEmployee?: (details: {
    company: ICompany | null;
    client: IClient | null;
  }) => void;
  onPressAddEmployee?: (details: {
    company: ICompany | null;
    client: IAddEmployeeClientArgs;
  }) => void;
  selectedClient: IClient | null;
  selectedCompany: ICompany | null;
  onPressLink: () => void;
  type?: 'link' | 'add';
}
