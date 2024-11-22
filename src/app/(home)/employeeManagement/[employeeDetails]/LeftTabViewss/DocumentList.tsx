/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import VirtualList from '@/components/molecules/VirtualList/VirtualList';
import DetailPageDocumentTab from '@/components/organism/DetailPageDocumentTab/DetailPageDocumentTab';
import { Skeleton } from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import React, { useEffect, useState } from 'react';

type IEmployeeDocumentList = {
  data: IEmployeeDocument[];
  onPressItem: (document: IEmployeeDocument) => void;
  isLoading: boolean;
};

const DocumentList: React.FC<IEmployeeDocumentList> = ({
  data,
  onPressItem,
  isLoading,
}) => {
  const [docs, setDocs] = useState<IEmployeeDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<IEmployeeDocument | null>(
    null
  );
  const { data: DemoData } = useDemoData({
    rowLength: 4,
    maxColumns: 9,
    dataSet: 'Employee',
  });
  useEffect(() => {
    if (data) {
      setDocs(data);
      setSelectedDoc(data[0]);
    }
  }, [data]);

  const onPressTab = (document: IEmployeeDocument) => {
    setSelectedDoc(document);
    onPressItem(document);
  };

  const renderItem = (index, document: IEmployeeDocument) => {
    return (
      <DetailPageDocumentTab
        document={document}
        isSelected={selectedDoc?.docName === document.docName}
        onPressTab={onPressTab}
      />
    );
  };
  const renderItemLoading = () => {
    return <Skeleton className="mx-auto" width={'90%'} height={80} />;
  };
  return (
    <VirtualList
      isLastPage={true}
      renderItem={isLoading ? renderItemLoading : (renderItem as any)}
      data={isLoading ? DemoData.rows : docs}
      isLoading={isLoading}
    />
  );
};

export default DocumentList;
