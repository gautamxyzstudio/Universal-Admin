/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import VirtualList from '@/components/molecules/VirtualList/VirtualList';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import React, { useCallback, useEffect, useState } from 'react';

export type IDocumentDetailsViewType = {
  onPressApprove: () => void;
  onPressReject: () => void;
  data: IEmployeeDocument[];
};

const DocumentDetailsView: React.FC<IDocumentDetailsViewType> = ({
  onPressApprove,
  onPressReject,
  data,
}) => {
  const [title, setTitle] = useState('All documents selected');
  const [docs, setDocs] = useState<IEmployeeDocument[]>([]);

  useEffect(() => {
    setDocs(data);
  }, [data]);

  const renderItem = useCallback(
    (_, item: IEmployeeDocument) => (
      <div className="mt-4">
        <DocumentCard
          label={item.docName}
          docImageSrc={item.doc?.url ?? ''}
          docImageName={item.doc?.name ?? ''}
          fileStyle="bg-lightPrimary"
        />
      </div>
    ),
    []
  );
  return (
    <div className="h-full w-full">
      {docs.length > 0 && (
        <h1 className="text-2xl sticky text-black">{title}</h1>
      )}
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
