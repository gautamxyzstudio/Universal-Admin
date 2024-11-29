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
import { IDocumentStatus, IEmployeeApiKeyStatus } from '@/constant/enums';
import { Skeleton } from '@mui/material';
import { STRINGS } from '@/constant/en';

type IEmployeeDocumentList = {
  data: {
    primaryDocuments: IEmployeeDocument[] | null;
    otherDocuments: IEmployeeDocument[] | null;
  };
  onPressItem: (
    type: 'primary' | 'secondary' | null,
    document: IEmployeeDocument
  ) => void;
  isLoading: boolean;
};

const DocumentList: React.FC<IEmployeeDocumentList> = ({
  data,
  onPressItem,
  isLoading,
}) => {
  const [primaryDocs, setPrimaryDocs] = useState<IEmployeeDocument[]>([]);
  const [docStatus, setDocStatus] = useState({
    primary: IDocumentStatus.VERIFIED,
    secondary: IDocumentStatus.VERIFIED,
  });
  const [secondaryDocs, setSecondaryDocs] = useState<IEmployeeDocument[]>([]);
  const [allRetested, setAllRetested] = useState<IEmployeeDocument>({
    doc: null,
    docId: null,
    docName: 'All Requested Documents',
    docStatus: IDocumentStatus.APPROVED,
    docStatusKey: IEmployeeApiKeyStatus.NULL,
  });
  const [selectedDoc, setSelectedDoc] = useState<{
    type: 'primary' | 'secondary' | null;
    doc: IEmployeeDocument | null;
  }>({
    type: null,
    doc: null,
  });
  const { data: DemoData } = useDemoData({
    rowLength: 4,
    maxColumns: 9,
    dataSet: 'Employee',
  });
  useEffect(() => {
    if (data.otherDocuments) setSecondaryDocs(data.otherDocuments);
    if (data.primaryDocuments) setPrimaryDocs(data.primaryDocuments);
    if (data.otherDocuments && data.primaryDocuments) {
      let isPending = false;
      [...(data?.primaryDocuments ?? []), ...(data.otherDocuments ?? [])].map(
        (doc) => {
          if (doc.docStatus === IDocumentStatus.PENDING) {
            isPending = true;
          }
        }
      );
      if (isPending) {
        setAllRetested({
          doc: null,
          docId: null,
          docName: 'New Requests',
          docStatus: IDocumentStatus.PENDING,
          docStatusKey: IEmployeeApiKeyStatus.NULL,
        });
      } else {
        setAllRetested({
          doc: null,
          docId: null,
          docName: 'New Requests',
          docStatus: IDocumentStatus.NULL,
          docStatusKey: IEmployeeApiKeyStatus.NULL,
        });
      }
    }
    if (data.primaryDocuments) {
      let isPending = false;
      [...data.primaryDocuments].map((doc) => {
        if (doc.docStatus === IDocumentStatus.PENDING) {
          isPending = true;
        }
      });
      if (isPending) {
        setDocStatus((prev) => ({ ...prev, primary: IDocumentStatus.PENDING }));
      } else {
        setDocStatus((prev) => ({
          ...prev,
          primary: IDocumentStatus.VERIFIED,
        }));
      }
    }
    if (data.otherDocuments) {
      let isPending = false;
      [...data.otherDocuments].map((doc) => {
        if (doc.docStatus === IDocumentStatus.PENDING) {
          isPending = true;
        }
      });
      if (isPending) {
        setDocStatus((prev) => ({
          ...prev,
          secondary: IDocumentStatus.PENDING,
        }));
      } else {
        setDocStatus((prev) => ({
          ...prev,
          secondary: IDocumentStatus.VERIFIED,
        }));
      }
    }
  }, [data]);

  const onPressTab = (
    type: 'primary' | 'secondary' | null,
    document: IEmployeeDocument
  ) => {
    setSelectedDoc({
      type: type,
      doc: document,
    });
    onPressItem(type, document);
  };

  const onPressChild = (
    type: 'primary' | 'secondary' | null,
    doc: IEmployeeDocument,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    onPressTab(type, doc);
  };

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
        <DetailPageDocumentTab
          document={allRetested}
          isSelected={selectedDoc.type === null}
          onPressTab={() => onPressTab(null, allRetested)}
        />
        <TabButton
          onPressButton={() => onPressTab('primary', primaryDocs[0])}
          content={
            <CustomAccordion
              title={accordionTitleComp(
                STRINGS.mandatoryDoc,
                docStatus.primary
              )}
              description={primaryDocs.map((document, index) =>
                accordionListItem(
                  (doc, e) => onPressChild('primary', doc, e),
                  selectedDoc.doc?.docId === document.docId,
                  document,
                  index
                )
              )}
              isExpanded={selectedDoc.type === 'primary'}
            />
          }
          isSelected={selectedDoc.type === 'primary'}
        ></TabButton>
        {secondaryDocs.length > 0 && (
          <TabButton
            onPressButton={() => onPressTab('secondary', secondaryDocs[0])}
            content={
              <CustomAccordion
                title={accordionTitleComp(
                  STRINGS.otherDoc,
                  docStatus.secondary
                )}
                description={secondaryDocs.map((doc, index) =>
                  accordionListItem(
                    (doc, e) => onPressChild('secondary', doc, e),
                    selectedDoc.doc?.docId === doc.docId,
                    doc,
                    index
                  )
                )}
                isExpanded={selectedDoc.type === 'secondary'}
              />
            }
            isSelected={selectedDoc.type === 'secondary'}
          ></TabButton>
        )}
      </>
    );
  };

  if (isLoading) return renderItemLoading();
  else return renderItem();
};

export default DocumentList;

const accordionTitleComp = (title: string, status: IDocumentStatus) => {
  return (
    <div className=" w-full rounded-lg flex items-center justify-between">
      <div className="flex flex-row gap-x-4">
        <Image src={Icons.doc} alt="Document image" className="w-auto h-auto" />
        <h1 className="text-black text-text-md">{title}</h1>
      </div>
      <span
        style={{
          color: getDocumentStatusColor(status),
        }}
        className={`text-[14px] leading-[18px]`}
      >
        {getDocumentStatusTextByStatus(status)}
      </span>
    </div>
  );
};

const accordionListItem = (
  onPress: (
    doc: IEmployeeDocument,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void,
  isSelected: boolean,
  document: IEmployeeDocument,
  index: number
) => {
  const dynamicClass = isSelected ? 'text-primary' : 'text-disable';
  return (
    <div
      key={index}
      onClick={(e) => onPress(document, e)}
      className="flex z-50 text-primary flex-row justify-between "
    >
      <span className={dynamicClass + ' text-sm'}>{document.docName}</span>
      <span
        style={{
          color: getDocumentStatusColor(document.docStatus),
        }}
        className={`text-text-12`}
      >
        {getDocumentStatusTextByStatus(document.docStatus)}
      </span>
    </div>
  );
};
