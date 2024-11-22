import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { STRINGS } from '@/constant/en';
import { MoreVertOutlined } from '@mui/icons-material';
import { Fade, IconButton, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../../../public/exporter';
import TextWithBgColor from '@/components/molecules/TextWithBgColor/TextWithBgColor';
import { IEmployeeDocument } from '@/api/fetures/Employee/EmployeeApi.types';
import { IDocumentStatus } from '@/constant/enums';
import { getDocumentStatusTextByStatus } from '@/utility/utils';

interface IUploadedFileProps {
  document: IEmployeeDocument;
  fileStyles?: string;
  onPressButton: (status: IDocumentStatus) => void;
}

const UploadedFile: React.FC<IUploadedFileProps> = ({
  document,
  fileStyles,
  onPressButton,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [empDocument, setEmpDocument] = useState<IEmployeeDocument | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setEmpDocument(document);
  }, [document]);

  return (
    <div
      className={fileStyles + ' rounded p-3 flex  items-center justify-between'}
    >
      {empDocument && (
        <>
          <div className="flex items-center gap-x-3">
            <Image
              src={empDocument.doc?.url ?? ''}
              alt="documents image"
              width={56}
              height={56}
              className="w-14 h-14 rounded-[4px] object-cover"
            />
            <div className="flex flex-col gap-y-2">
              <h2 className="text-Black text-[16px] leading-5">
                {empDocument.doc?.name}
              </h2>
              {/* {days && (
                <h2 className="text-disable text-[14px] leading-[18px]">
                  {days}
                </h2>
              )} */}
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
              </>
            )}
            {document.docStatus !== IDocumentStatus.PENDING && (
              <>
                <TextWithBgColor
                  textStyle={`${
                    document.docStatus === IDocumentStatus.APPROVED
                      ? 'bg-lightGreen text-green'
                      : 'bg-lightRed text-red'
                  }`}
                  textLabel={getDocumentStatusTextByStatus(document.docStatus)}
                />
                <IconButton
                  id="openMenu"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{ padding: 0 }}
                  onClick={handleClick}
                >
                  <MoreVertOutlined />
                </IconButton>
                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  MenuListProps={{
                    'aria-labelledby': 'openMenu',
                  }}
                  sx={{
                    '.MuiList-root': {
                      padding: '0px',
                    },
                    '.MuiMenuItem-root': {
                      padding: '12px 6px 12px 12px',
                      gap: '12px',
                      fontSize: '12px',
                      lineHeight: '16px',
                    },
                  }}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>
                    <Image src={Icons.hide} alt="hide" />
                    <span>Hide from employee side</span>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UploadedFile;
