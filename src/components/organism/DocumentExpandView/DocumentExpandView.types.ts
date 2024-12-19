import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';

export interface IDocumentExpandView {
  isVisible: boolean;
  document: IEmployeeDocument | null;
  onPressClose: (
    event?: object,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => void;
}
