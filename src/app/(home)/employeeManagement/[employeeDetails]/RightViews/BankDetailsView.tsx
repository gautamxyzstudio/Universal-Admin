import { IEmployeeAdvance } from '@/api/fetures/Employee/EmployeeApi.types';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import TextGroup from '@/components/organism/TextGroup/TextGroup';
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import React from 'react';

type IBankDetailsViewProps = {
  employee: IEmployeeAdvance | null;
  onPressButton: (
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
        textgroupStyle="flex flex-col gap-y-1"
        title={'Bank account number'}
        text={employee?.bankingDetails?.bankAccNo ?? ''}
      />
      <TextGroup
        textgroupStyle="flex flex-col gap-y-1"
        title={'Institution number'}
        text={employee?.bankingDetails?.institutionNumber ?? ''}
      />
      <TextGroup
        textgroupStyle="flex flex-col gap-y-1"
        title={'Transit Number'}
        text={employee?.bankingDetails?.transitNumber ?? ''}
      />
      {employee?.bankingDetails.chique && (
        <DocumentCard
          fileStyle="bg-lightPrimary"
          doc={employee?.bankingDetails.chique}
          onPressButton={(status) =>
            onPressButton(status, IEmployeeApiKeyStatus.CHEQUE, true)
          }
        />
      )}
    </div>
  );
};

export default BankDetailsView;
