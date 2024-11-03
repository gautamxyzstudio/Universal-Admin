import { IClient } from '@/api/fetures/Client/Client.types';
import { ICompany } from '@/api/fetures/Company/Company.types';

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
    onDeselectCompany: () => void;
    onPressAddEmployee: (details: { company: ICompany | null; client: IClient | null }) => void;
    selectedClient: IClient | null;
    selectedCompany: ICompany | null;
    onPressLink: () => void;
}
