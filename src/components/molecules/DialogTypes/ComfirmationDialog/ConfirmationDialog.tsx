import React, { useMemo } from "react";
import {
  getDialogAttributes,
  IConfirmationDialogProps,
} from "./ConfirmationDialog.types";
import CustomDialog from "@/components/atoms/CustomDialog/CustomDialog";
import Image from "next/image";
import { STRINGS } from "@/constant/en";
import CustomButton from "@/components/atoms/CutomButton/CustomButton";

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  type,
  title,
  onPressLogout,
  description,
  onClose,
  open,
}) => {
  const dialogAttributes = getDialogAttributes(type);
  const buttonStyles = useMemo(() => {
    return {
      width: 156,
      height: 36,
      borderRadius: 40,
    };
  }, []);
  return (
    <CustomDialog width={348} open={open} onClose={onClose}>
      <div className="p-6 flex flex-col items-center gap-y-2">
        <Image src={dialogAttributes.icon} alt="logo" />
        <div className="mt-4">
          {type === "logout" && (
            <p className="text-center">{STRINGS.logout_message}</p>
          )}
          {type === "success" && (
            <>
              <p className="text-center text-Black font-bold text-[20px] leading-6">{title}</p>
              <p className="text-center text-disable mt-4 text-[14px] leading-[18px]">{description}</p>
            </>
          )}
        </div>
        <div className="mt-3" />
        {type === "logout" && (
          <CustomButton
            customStyles={buttonStyles}
            variant="outlined"
            title={STRINGS.logout}
            onClick={onPressLogout}
            buttonType={"outline-small-red"}
          />
        )}
      </div>
    </CustomDialog>
  );
};

export default ConfirmationDialog;
