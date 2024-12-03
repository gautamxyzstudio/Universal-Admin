import {
  IEmployeeAdvance,
  IEmployeeDocument,
} from '@/api/fetures/Employee/EmployeeApi.types';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import TextGroup from '@/components/organism/TextGroup/TextGroup';
import { ITextGroupTypes } from '@/components/organism/TextGroup/TextGroup.types';
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import React from 'react';

type IBankDetailsViewProps = {
  employee: IEmployeeAdvance | null;
  onPressButton: (
    item: IEmployeeDocument,
    status: IDocumentStatus,
    key: IEmployeeApiKeyStatus,
    isCheque?: boolean
  ) => void;
};

const BankDetailsView: React.FC<IBankDetailsViewProps> = ({
  employee,
  onPressButton,
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
      {employee?.bankingDetails.chique && (
        <DocumentCard
          fileStyle="bg-lightPrimary"
          doc={employee?.bankingDetails.chique}
          onPressButton={(status) =>
            onPressButton(
              employee?.bankingDetails.chique,
              status,
              IEmployeeApiKeyStatus.CHEQUE,
              true
            )
          }
        />
      )}
    </div>
  );
};

export default BankDetailsView;
