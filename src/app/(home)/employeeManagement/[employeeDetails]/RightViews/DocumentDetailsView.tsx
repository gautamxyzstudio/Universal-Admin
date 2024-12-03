/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import DocumentCard from '@/components/organism/DocumentCard/DocumentCard';
import EmptyScreenView from '@/components/templates/EmptyScreenView/EmptyScreenView';
import { STRINGS } from '@/constant/en';
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../../../../../public/exporter';

export type IDocumentDetailsViewType = {
  onPressButton: (
    item: IEmployeeDocument,
    status: IDocumentStatus,
    key: IEmployeeApiKeyStatus,
    id: number,
    isUpdate?: boolean,
    licenseNumber?: string
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

  const renderItem = useCallback(
    (index, item: IEmployeeDocument) => (
      <div className="mt-4">
        <DocumentCard
          fileStyle="bg-lightPrimary"
          doc={item}
          isPrevious={index === 1 && data.heading !== 'New Requests'}
          onPressButton={(status, licenseNumber) => {
            onPressButton(
              item,
              status,
              item?.docStatusKey ?? IEmployeeApiKeyStatus.SIN_DOCUMENT,
              item.docId ?? 0,
              item.isUpdate,
              licenseNumber
            );
          }}
        />
      </div>
    ),
    [docs]
  );
  return (
    <div className="h-full w-full">
      {docs.length > 0 && <h1 className="text-2xl">{title}</h1>}
      {docs.length > 0 && (
        <>
          {docs.map((doc, index) => {
            return renderItem(index, doc);
          })}
        </>
      )}
      {docs.length == 0 && (
        <div className="flex flex-row h-full w-full items-center justify-center">
          <EmptyScreenView
            illustration={Images.noDocRequest}
            emptyViewSubTitle={STRINGS.youHaveNoPending}
            isDataEmpty={docs?.length === 0}
            emptyViewTitle={STRINGS.no_pending}
          />
        </div>
      )}
      <div className="h-6" />
    </div>
  );
};

export default DocumentDetailsView;
