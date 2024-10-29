import { IClient } from '@/api/fetures/Client/Client.types';

export type ILinkClientFrom = {
  clientName: string;
  companyName: string;
  industry: string;
  email: string;
  contactNumber: string;
  location: string;
  clientNameError: string;
  companyNameError: string;
  industryError: string;
  emailError: string;
  contactNumberError: string;
  locationError: string;
};

export interface ILinkOrAddClientFrom {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  selectedClient: IClient | null;
  onPressLink: () => void;
}
