/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import DetailPageDocumentTab from '@/components/organism/DetailPageDocumentTab/DetailPageDocumentTab';
import { useDemoData } from '@mui/x-data-grid-generator';
import React, { useEffect, useState } from 'react';
import { IDocumentStatus } from '@/constant/enums';
import { Skeleton } from '@mui/material';

type IEmployeeDocumentList = {
  data: IEmployeeDocument[];
  onPressItem: (document: IEmployeeDocument | null) => void;
  isLoading: boolean;
};

const DocumentList: React.FC<IEmployeeDocumentList> = ({
  data,
  onPressItem,
  isLoading,
}) => {
  const [documents, setDocuments] = useState<IEmployeeDocument[]>([]);
  const [allRetested, setAllRetested] = useState<IEmployeeDocument>({
    doc: null,
    docId: null,
    docName: 'All Requested Documents',
    docStatus: IDocumentStatus.APPROVED,
  });
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const { data: DemoData } = useDemoData({
    rowLength: 4,
    maxColumns: 9,
    dataSet: 'Employee',
  });

  useEffect(() => {
    if (data) {
      setDocuments(data);
    }
  }, [data]);

  const onPressDoc = (doc: IEmployeeDocument | null) => {
    setSelectedDocId(doc?.docId ?? null);
    onPressItem(doc);
  };

  useEffect(() => {
    if (documents) {
      let isPending = false;
      documents.forEach((doc) => {
        if (doc.docStatus === IDocumentStatus.PENDING) {
          isPending = true;
        }
      });
      if (!isPending) {
        setAllRetested({
          doc: null,
          docId: null,
          docName: 'All Requested Documents',
          docStatus: IDocumentStatus.NULL,
        });
      } else {
        setAllRetested({
          doc: null,
          docId: null,
          docName: 'All Requested Documents',
          docStatus: IDocumentStatus.PENDING,
        });
      }
    }
  }, [documents]);

  const renderItemLoading = () => {
    return (
      <>
        {DemoData.rows.map((row, index) => (
          <Skeleton key={index} className="mx-auto" width={'90%'} height={80} />
        ))}
      </>
    );
  };

  const renderItem = () => {
    return (
      <>
        {documents.map((doc, index) => {
          if (index === 0) {
            return (
              <DetailPageDocumentTab
                key={index}
                document={allRetested}
                isSelected={selectedDocId === null}
                onPressTab={() => onPressDoc(null)}
              />
            );
          } else {
            return (
              <DetailPageDocumentTab
                key={index}
                document={doc}
                isSelected={selectedDocId === doc.docId}
                onPressTab={() => onPressDoc(doc)}
              />
            );
          }
        })}
      </>
    );
  };

  if (isLoading) return renderItemLoading();
  else return renderItem();
};

export default DocumentList;
