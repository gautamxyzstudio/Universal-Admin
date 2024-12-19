import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';

export type IDocumentExpandViewContext = {
  showDocModal: (document: IEmployeeDocument) => void;
};
