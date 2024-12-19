import {
  IEmployeeAdvance,
  IEmployeeDocument,
} from '@/api/fetures/Employee/EmployeeApi.types';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import TextGroup from '@/components/organism/TextGroup/TextGroup';
import { ITextGroupTypes } from '@/components/organism/TextGroup/TextGroup.types';
import { IDocumentStatus } from '@/constant/enums';
import React from 'react';

type IBankDetailsViewProps = {
  employee: IEmployeeAdvance | null;
  cheque: IEmployeeDocument | null;
  onPressButton: (
    item: IEmployeeDocument | null,
    status: IDocumentStatus
  ) => void;
};

const BankDetailsView: React.FC<IBankDetailsViewProps> = ({
  employee,
  onPressButton,
  cheque,
}) => {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      <TextGroup
        type={ITextGroupTypes.textTypeBank}
        title={'Bank account number'}
        text={employee?.bankingDetails?.bankAccNo ?? ''}
      />
      <TextGroup
        type={ITextGroupTypes.textTypeBank}
        title={'Institution number'}
        text={employee?.bankingDetails?.institutionNumber ?? ''}
      />
      <TextGroup
        type={ITextGroupTypes.textTypeBank}
        title={'Transit Number'}
        text={employee?.bankingDetails?.transitNumber ?? ''}
      />
      {cheque && (
        <DocumentCard
          fileStyle="bg-lightPrimary"
          doc={cheque}
          onPressButton={(status) => onPressButton(cheque, status)}
        />
      )}
    </div>
  );
};

export default BankDetailsView;
