/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import React, { useEffect, useState } from 'react';

export type IDocumentDetailsViewType = {
  onPressButton: (
    status: IDocumentStatus,
    key: IEmployeeApiKeyStatus,
    id: number
  ) => void;
  data: {
    heading: string;
    docs: IEmployeeDocument[];
  };
};

const DocumentDetailsView: React.FC<IDocumentDetailsViewType> = ({
  onPressButton,
  data,
}) => {
  const [docs, setDocs] = useState<IEmployeeDocument[]>([]);
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    if (data) {
      setDocs(data.docs);
      setTitle(data.heading);
    }
  }, [data]);

  const renderItem = (_, item: IEmployeeDocument) => (
    <div className="mt-4">
      <DocumentCard
        fileStyle="bg-lightPrimary"
        doc={item}
        onPressButton={(status) =>
          onPressButton(
            status,
            item?.docStatusKey ?? IEmployeeApiKeyStatus.SIN_DOCUMENT,
            item.docId ?? 0
          )
        }
      />
    </div>
  );
  return (
    <div className="h-full w-full">
      <h1 className="text-2xl">{title}</h1>
      {docs.length > 0 && (
        <>
          {docs.map((doc, index) => {
            return renderItem(index, doc);
          })}
        </>
      )}
      <div className="h-6" />
    </div>
  );
};

export default DocumentDetailsView;
