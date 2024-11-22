/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import VirtualList from '@/components/molecules/VirtualList/VirtualList';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import React, { useCallback, useEffect, useState } from 'react';

export type IDocumentDetailsViewType = {
  onPressButton: (status: IDocumentStatus, key: IEmployeeApiKeyStatus) => void;
  data: IEmployeeDocument[];
};

const DocumentDetailsView: React.FC<IDocumentDetailsViewType> = ({
  onPressButton,
  data,
}) => {
  const [docs, setDocs] = useState<IEmployeeDocument[]>([]);

  useEffect(() => {
    setDocs(data);
  }, [data]);

  const renderItem = useCallback(
    (_, item: IEmployeeDocument) => (
      <div className="mt-4">
        <DocumentCard
          fileStyle="bg-lightPrimary"
          doc={item}
          onPressButton={(status) =>
            onPressButton(
              status,
              item?.docStatusKey ?? IEmployeeApiKeyStatus.SIN_DOCUMENT
            )
          }
        />
      </div>
    ),
    []
  );
  return (
    <div className="h-full w-full">
      <VirtualList
        data={docs}
        isLastPage
        renderItem={renderItem as any}
        isLoading={false}
      />
    </div>
  );
};

export default DocumentDetailsView;
