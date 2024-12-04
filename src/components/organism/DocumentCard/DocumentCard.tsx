import React, { ChangeEvent, useEffect, useState } from 'react';
import UploadedFile from '../UploadedFile/UploadedFile';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentStatus } from '@/constant/enums';
import { STRINGS } from '@/constant/en';
import CustomInput from '@/components/atoms/CustomInput/CustomInput';
import Image from 'next/image';
import { Icons } from '../../../../public/exporter';
import CustomButton from '@/components/atoms/CustomButton/CustomButton';

interface IDocumentCardProps {
  doc: IEmployeeDocument;
  fileStyle?: string;
  onPressButton: (status: IDocumentStatus, licenseNumber?: string) => void;
  isPrevious?: boolean;
}

const DocumentCard: React.FC<IDocumentCardProps> = ({
  doc,
  fileStyle,
  onPressButton,
  isPrevious,
}) => {
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState('');
  const isLicenseType =
    doc.docName === STRINGS.license_advance ||
    doc.docName === STRINGS.license_basic;

  useEffect(() => {
    setLicenseNumber(doc?.licenseNo ?? '');
    setIsDisabled(doc.licenseNo ? true : false);
  }, [doc]);

  const onChangeLicenseNumber = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(false);
    setLicenseNumber(e.target.value);
  };

  const buttonPressHandler = (status: IDocumentStatus) => {
    if (
      isLicenseType &&
      (status === IDocumentStatus.APPROVED || status === IDocumentStatus.UPDATE)
    ) {
      if (licenseNumber.trim() === '') {
        setError(true);
        return;
      }
      onPressButton(status, licenseNumber);
    } else {
      onPressButton(status);
    }
    setIsDisabled(true);
  };

  return (
    <div className="border border-borderGrey rounded p-3 w-full">
      <div className="flex flex-col gap-y-4 text-[14px] leading-[18px]">
        <div>
          <div>
            {doc.isUpdate && (
              <h2 className="text-Black  mb-2 font-bold pb-2  border-b-[1px] border-b-[#EBEBEB]">
                {doc.docStatus === IDocumentStatus.PENDING
                  ? STRINGS.updateRequest
                  : STRINGS.updatedDoc}
              </h2>
            )}
            {isPrevious && (
              <h2 className="text-Black  mb-2 font-bold pb-2  border-b-[1px] border-b-[#EBEBEB]">
                {STRINGS.previousDoc}
              </h2>
            )}
          </div>
          {/* {uploadDays && <span className="text-disable">{uploadDays}</span>} */}
        </div>
        <UploadedFile
          document={doc}
          isPrevious={isPrevious ?? false}
          fileStyles={fileStyle}
          onPressButton={buttonPressHandler}
        />
        {isLicenseType && !isPrevious && (
          <>
            <div className="w-full flex items-center flex-row justify-between">
              <span>{`${doc.docName} number`}</span>
              {!isDisabled && doc.licenseNo && (
                <CustomButton
                  customStyles={{
                    '.MuiLoadingButton-label': {
                      gap: '4px',
                    },
                  }}
                  buttonType="outline-small-blue"
                  variant="outlined"
                  title={STRINGS.saveChanges}
                  onClick={() => buttonPressHandler(doc.docStatus)}
                />
              )}
              {doc.licenseNo && isDisabled && (
                <Image
                  onClick={() => setIsDisabled(false)}
                  className="cursor-pointer"
                  src={Icons.pencil}
                  alt="pencil"
                />
              )}
            </div>
            <CustomInput
              sx={{
                width: '100%',
              }}
              placeholder={`${doc.docName} number`}
              disabled={isDisabled}
              error={error}
              errorMessage={error ? 'This is a required field' : ''}
              value={licenseNumber}
              onChange={onChangeLicenseNumber}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
