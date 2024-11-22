import React from 'react';
import UploadedFile from '../UploadedFile/UploadedFile';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentStatus } from '@/constant/enums';

interface IDocumentCardProps {
  doc: IEmployeeDocument;
  fileStyle?: string;
  onPressButton: (status: IDocumentStatus) => void;
}

const DocumentCard: React.FC<IDocumentCardProps> = ({
  doc,
  fileStyle,
  onPressButton,
}) => {
  return (
    <div className="border border-borderGrey rounded p-3 w-full">
      <div className="flex flex-col gap-y-4 text-[14px] leading-[18px]">
        <div className="flex items-center justify-between">
          <h2 className="text-Black">{doc.docName}</h2>
          {/* {uploadDays && <span className="text-disable">{uploadDays}</span>} */}
        </div>
        <UploadedFile
          document={doc}
          fileStyles={fileStyle}
          onPressButton={onPressButton}
        />
      </div>
    </div>
  );
};

export default DocumentCard;
