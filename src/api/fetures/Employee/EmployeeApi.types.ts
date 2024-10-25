import { IDocumentStatus } from '@/constant/enums';

export interface IGetEmployeeApiResponse {
  data: {
    id: number;
    email: string;
    euser_id: {
      id: number;
      name: string;
      dob: Date;
      gender: string;
      email: string;
      phone: string;
      city: string;
      address: string;
      sinNo: string;
      workStatus: string;
      bankAcNo: string;
      institutionNumber: string;
      trasitNumber: string;
      createdAt: Date;
      govtidStaus: IDocumentStatus;
      directDepositVoidChequeStatus: IDocumentStatus;
      sinDocumentStatus: IDocumentStatus;
      securityDocBasicStatus: IDocumentStatus;
      securityDocumentAdvStatus: IDocumentStatus;
    };
  };
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
