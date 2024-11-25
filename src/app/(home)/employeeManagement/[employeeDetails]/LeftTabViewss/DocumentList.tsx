/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import CustomAccordion from '@/components/atoms/CustomAccordion/CustomAccordion';
import DetailPageDocumentTab from '@/components/organism/DetailPageDocumentTab/DetailPageDocumentTab';
import { useDemoData } from '@mui/x-data-grid-generator';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../../../../../public/exporter';
import Image from 'next/image';
import TabButton from '@/components/molecules/ButtonTypes/TabButton/TabButton';
import {
  getDocumentStatusColor,
  getDocumentStatusTextByStatus,
} from '@/utility/utils';

type IEmployeeDocumentList = {
  data: {
    primaryDocuments: IEmployeeDocument[] | null;
    otherDocuments: IEmployeeDocument[] | null;
  };
  onPressItem: (document: IEmployeeDocument) => void;
  isLoading: boolean;
};

const DocumentList: React.FC<IEmployeeDocumentList> = ({
  data,
  onPressItem,
  isLoading,
}) => {
  const [primaryDocs, setPrimaryDocs] = useState<IEmployeeDocument[]>([]);
  const [secondaryDocs, setSecondaryDocs] = useState<IEmployeeDocument[]>([]);

  const [selectedDoc, setSelectedDoc] = useState<IEmployeeDocument | null>(
    null
  );
  const { data: DemoData } = useDemoData({
    rowLength: 4,
    maxColumns: 9,
    dataSet: 'Employee',
  });
  useEffect(() => {
    if (data.otherDocuments) setSecondaryDocs(data.otherDocuments);

    if (data.primaryDocuments) setPrimaryDocs(data.primaryDocuments);
  }, [data]);

  const onPressTab = (document: IEmployeeDocument) => {
    setSelectedDoc(document);
    onPressItem(document);
  };

  // const renderItem = (index, document: IEmployeeDocument) => {
  //   return (
  //     <DetailPageDocumentTab
  //       document={document}
  //       isSelected={selectedDoc?.docName === document.docName}
  //       onPressTab={onPressTab}
  //     />
  //   );
  // };

  return (
    <>
      <DetailPageDocumentTab
        document={primaryDocs[0]}
        isSelected={selectedDoc?.docName === primaryDocs[0]?.docName}
        onPressTab={onPressTab}
      />
      <TabButton
        content={
          <CustomAccordion
            title={
              <div className=" w-full rounded-lg flex items-center justify-between">
                <div className="flex flex-row gap-x-4">
                  <Image
                    src={Icons.doc}
                    alt="Document image"
                    className="w-auto h-auto"
                  />
                  <h1 className="text-black text-text-md">
                    Mandatory Documents
                  </h1>
                </div>
                <span
                  style={{
                    color: getDocumentStatusColor(primaryDocs[0]?.docStatus),
                  }}
                  className={`text-[14px] leading-[18px]`}
                >
                  {getDocumentStatusTextByStatus(primaryDocs[0]?.docStatus)}
                </span>
              </div>
            }
            description={
              <ul>
                {primaryDocs.map((doc, index) => (
                  <li key={index}>
                    <p></p>
                    {doc.docName}
                  </li>
                ))}
              </ul>
            }
            isExpanded={true}
          />
        }
        isSelected={true}
      ></TabButton>
      <TabButton
        content={
          <CustomAccordion
            title={
              <div className=" w-full rounded-lg flex items-center justify-between">
                <div className="flex flex-row gap-x-4">
                  <Image
                    src={Icons.doc}
                    alt="Document image"
                    className="w-auto h-auto"
                  />
                  <h1 className="text-black text-text-md">
                    Mandatory Documents
                  </h1>
                </div>
                <span
                  style={{
                    color: getDocumentStatusColor(secondaryDocs[0]?.docStatus),
                  }}
                  className={`text-[14px] leading-[18px]`}
                >
                  {getDocumentStatusTextByStatus(secondaryDocs[0]?.docStatus)}
                </span>
              </div>
            }
            description={
              <ul>
                {secondaryDocs.map((doc, index) => (
                  <li key={index}>
                    <p></p>
                    {doc.docName}
                  </li>
                ))}
              </ul>
            }
            isExpanded={true}
          />
        }
        isSelected={true}
      ></TabButton>
    </>
  );
};

export default DocumentList;
