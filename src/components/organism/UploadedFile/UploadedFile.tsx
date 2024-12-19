import { STRINGS } from '@/constant/en';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { base64Icon, Icons } from '../../../../public/exporter';
import TextWithBgColor from '@/components/molecules/TextWithBgColor/TextWithBgColor';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentStatus, IJobPostStatus } from '@/constant/enums';
import {
  getDocumentStatusStyles,
  getDocumentStatusTextByStatus,
} from '@/utility/utils';
import { useDocumentExpandViewContext } from '@/contexts/DocumentExpandedViewContext/DocumentExpandedViewContext';
import CustomButton from '@/components/atoms/CustomButton/CustomButton';
import CustomMenuComponent from '@/components/atoms/CustomMenuComponent/CustomMenuComponent';

interface IUploadedFileProps {
  document: IEmployeeDocument;
  fileStyles?: string;
  isPrevious: boolean;
  onPressButton: (status: IDocumentStatus) => void;
}

const UploadedFile: React.FC<IUploadedFileProps> = ({
  document,
  fileStyles,

  isPrevious,
  onPressButton,
}) => {
  const [empDocument, setEmpDocument] = useState<IEmployeeDocument | null>(
    null
  );
  const { showDocModal } = useDocumentExpandViewContext();

  useEffect(() => {
    setEmpDocument(document);
  }, [document]);

  const onPressViewDocHandler = () => {
    showDocModal(document);
  };

  const onPressTreeDotOption = () => {
    if (document.docStatus === IDocumentStatus.DENIED && document.isUpdate) {
      onPressButton(IDocumentStatus.UPDATE);
    } else if (
      document.docStatus === IDocumentStatus.APPROVED ||
      document.docStatus === IDocumentStatus.UPDATE
    ) {
      onPressButton(IDocumentStatus.DENIED);
    } else if (
      document.docStatus === IDocumentStatus.DENIED &&
      !document.isUpdate
    ) {
      onPressButton(IDocumentStatus.APPROVED);
    } else {
      onPressButton(IDocumentStatus.DENIED);
    }
  };

  return (
    <div
      className={fileStyles + ' rounded p-3 flex  items-center justify-between'}
    >
      {empDocument && (
        <>
          <div className="flex items-center gap-x-3">
            <div className="group flex justify-center text-center relative overflow-hidden rounded-md cursor-pointe">
              <Image
                src={empDocument.doc?.url ?? ''}
                alt="documents image"
                placeholder="blur"
                blurDataURL={base64Icon.spinner}
                width={56}
                height={56}
                className="w-14 h-14 rounded-[4px] object-cover"
              />
              <div
                onClick={onPressViewDocHandler}
                className="absolute bg-[#121212] text-white text-sm text-center flex items-center justify-center w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-70"
              >
                {STRINGS.view}
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-Black text-[16px] leading-5">
                {empDocument.docName}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            {document.docStatus === IDocumentStatus.PENDING && (
              <>
                <CustomButton
                  customStyles={{
                    '.MuiLoadingButton-label': {
                      gap: '4px',
                    },
                  }}
                  buttonType="outline-small-red"
                  variant="outlined"
                  title={STRINGS.deny}
                  onClick={() => onPressButton(IDocumentStatus.DENIED)}
                  icon={
                    <Image
                      src={Icons.crossmark}
                      alt="deny"
                      className="w-4 h-4"
                    />
                  }
                />
                {empDocument.isUpdate ? (
                  <CustomButton
                    customStyles={{
                      '.MuiLoadingButton-label': {
                        gap: '4px',
                      },
                    }}
                    buttonType="outline-small-blue"
                    variant="outlined"
                    title={STRINGS.update}
                    onClick={() => onPressButton(IDocumentStatus.UPDATE)}
                    icon={
                      <Image
                        src={Icons.accept}
                        alt="accept"
                        className="w-4 h-4"
                      />
                    }
                  />
                ) : (
                  <CustomButton
                    customStyles={{
                      '.MuiLoadingButton-label': {
                        gap: '4px',
                      },
                    }}
                    buttonType="outline-small-green"
                    variant="outlined"
                    title={STRINGS.approved}
                    onClick={() => onPressButton(IDocumentStatus.APPROVED)}
                    icon={
                      <Image
                        src={Icons.accept}
                        alt="accept"
                        className="w-4 h-4"
                      />
                    }
                  />
                )}
              </>
            )}
            {document.docStatus !== IDocumentStatus.PENDING && (
              <>
                <TextWithBgColor
                  textStyle={getDocumentStatusStyles(
                    document.docStatus ?? IJobPostStatus.OPEN
                  )}
                  textLabel={getDocumentStatusTextByStatus(document.docStatus)}
                />
                {!isPrevious && (
                  <CustomMenuComponent
                    data={[
                      {
                        icon: Icons.denyIcon,
                        value:
                          document.docStatus === IDocumentStatus.DENIED
                            ? 'Approve'
                            : 'Deny',
                        onPresItem: onPressTreeDotOption,
                      },
                    ]}
                    isOpen={true}
                    menuButton={undefined}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UploadedFile;
