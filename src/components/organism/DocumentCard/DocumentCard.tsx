import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import UploadedFile from "../UploadedFile/UploadedFile";

interface IDocumentCardProps {
  label?: string;
  uploadDays?: string;
  docImageSrc: StaticImport;
  docImageName: string;
}

const DocumentCard: React.FC<IDocumentCardProps> = ({
  label,
  uploadDays,
  docImageSrc,
  docImageName,
}) => {
  return (
    <div className="border border-borderGrey rounded p-3 w-full">
      <div className="flex flex-col gap-y-4 text-[14px] leading-[18px]">
        <div className="flex items-center justify-between">
          <h2 className="text-Black">{label}</h2>
          {uploadDays && <span className="text-disable">{uploadDays}</span>}
        </div>
        <UploadedFile fileName={docImageName} fileSrc={docImageSrc} />
      </div>
    </div>
  );
};

export default DocumentCard;
