import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import TabButton from '@/components/molecules/ButtonTypes/TabButton/TabButton';
import React from 'react';
import { Icons } from '../../../../public/exporter';
import Image from 'next/image';
import {
  getDocumentStatusColor,
  getDocumentStatusTextByStatus,
} from '@/utility/utils';

type IDetailPageDocumentTab = {
  document: IEmployeeDocument;
  isSelected: boolean;
  onPressTab: (document: IEmployeeDocument) => void;
};
const DetailPageDocumentTab: React.FC<IDetailPageDocumentTab> = ({
  document,
  isSelected,
  onPressTab,
}) => {
  return (
    <TabButton
      isSelected={isSelected}
      onPressButton={() => onPressTab(document)}
      content={
        <div className=" w-full rounded-lg flex items-center justify-between">
          <div className="flex flex-row gap-x-4">
            <Image
              src={Icons.doc}
              alt="Document image"
              className="w-auto h-auto"
            />
            <h1 className="text-black text-text-md">{document?.docName}</h1>
          </div>
          <span
            style={{ color: getDocumentStatusColor(document?.docStatus) }}
            className={`text-[14px] leading-[18px]`}
          >
            {getDocumentStatusTextByStatus(document?.docStatus)}
          </span>
        </div>
      }
    />
  );
};

export default DetailPageDocumentTab;
