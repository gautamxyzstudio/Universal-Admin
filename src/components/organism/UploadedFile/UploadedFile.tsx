"use client";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import { STRINGS } from "@/constant/en";
import { Close, MoreVertOutlined } from "@mui/icons-material";
import {
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";
import { Icons } from "../../../../public/exporter";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";

interface IUploadedFileProps {
  fileName: string;
  days?: string;
  fileSrc: StaticImport;
  fileStyle?: string;
}

const UploadedFile: React.FC<IUploadedFileProps> = ({
  fileName,
  days,
  fileSrc,
  fileStyle,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [status, setStatus] = React.useState<string | null>(null);
  const [buttonsVisible, setButtonsVisible] = React.useState(true);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleApprove = () => {
    setStatus(STRINGS.approved);
    setButtonsVisible(false);
  };

  const handleDeny = () => {
    setStatus(STRINGS.deny);
    setButtonsVisible(false);
  };

  const handleViewImage = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div
        className={
          fileStyle + " rounded p-3 flex  items-center justify-between"
        }
      >
        <div className="flex items-center gap-x-3">
          <div className="group flex justify-center text-center relative overflow-hidden rounded-md cursor-pointer">
            <Image
              src={fileSrc}
              alt="documents image"
              className="w-14 h-14 rounded object-contain"
            />
            <div
              className="absolute bg-black text-white text-center flex items-center justify-center w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-80"
              onClick={handleViewImage}
            >
              {STRINGS.view}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-Black text-[16px] leading-5">{fileName}</h2>
            {days && (
              <h2 className="text-disable text-[14px] leading-[18px]">
                {days}
              </h2>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          {buttonsVisible && (
            <>
              <CustomButton
                customStyles={{
                  ".MuiLoadingButton-label": {
                    gap: "4px",
                  },
                }}
                buttonType="outline-small-red"
                variant="outlined"
                title={STRINGS.deny}
                onClick={handleDeny}
                icon={
                  <Image src={Icons.crossmark} alt="deny" className="w-4 h-4" />
                }
              />
              <CustomButton
                customStyles={{
                  ".MuiLoadingButton-label": {
                    gap: "4px",
                  },
                }}
                buttonType="outline-small-green"
                variant="outlined"
                title={STRINGS.approved}
                onClick={handleApprove}
                icon={
                  <Image src={Icons.accept} alt="accept" className="w-4 h-4" />
                }
              />
            </>
          )}
          {status && (
            <>
              <TextWithBgColor
                textStyle={`${
                  status === STRINGS.approved
                    ? "bg-lightGreen text-green"
                    : "bg-lightRed text-red"
                }`}
                textLabel={status}
              />
              <IconButton
                id="openMenu"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{ padding: 0 }}
                onClick={handleClick}
              >
                <MoreVertOutlined />
              </IconButton>
              <Menu
                open={open}
                anchorEl={anchorEl}
                MenuListProps={{
                  "aria-labelledby": "openMenu",
                }}
                sx={{
                  ".MuiList-root": {
                    padding: "0px",
                  },
                  ".MuiMenuItem-root": {
                    padding: "12px 6px 12px 12px",
                    gap: "12px",
                    fontSize: "12px",
                    lineHeight: "16px",
                  },
                }}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>
                  <Image src={Icons.hide} alt="hide" />
                  <span>Hide from employee side</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Image src={Icons.circleCross} alt="hide" />
                  <span>Deny</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Image src={Icons.dustbin} alt="hide" />
                  <span>Delete</span>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
      {openModal === true ? (
        <Dialog open={openModal}>
          <DialogTitle
            sx={{
              padding: "16px 12px",
            }}
          >
            {fileName}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenModal(false)}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <Close />
          </IconButton>
          <DialogContent sx={{ padding: "12px" }}>
            <Image
              src={fileSrc}
              className="w-full h-full rounded-lg cursor-zoom-in"
              alt={fileName}
            />
          </DialogContent>
        </Dialog>
      ) : (
        false
      )}
    </>
  );
};

export default UploadedFile;
