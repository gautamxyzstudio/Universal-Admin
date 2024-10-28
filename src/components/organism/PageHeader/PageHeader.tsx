"use client";
import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import { Add } from "@mui/icons-material";
import React from "react";
import { IPageHeaderProps } from "./PageHeader.types";

const PageHeader: React.FC<IPageHeaderProps> = ({
  primaryButtonTitle,
  title,
  secondaryButtonTitle,
  withPrimaryButton,
  onPressButton,
  withSecondaryButton,
}) => {
  return (
    <div className="flex w-full justify-between items-center my-6">
      <h1 className="text-Black font-bold text-[24px] leading-7">{title}</h1>
      {withPrimaryButton && (
        <CustomButton
          title={primaryButtonTitle ?? ""}
          icon={<Add />}
          onClick={onPressButton}
          size="small"
          buttonType={"primary-small"}
        />
      )}
      {withSecondaryButton && (
        <CustomButton
          title={secondaryButtonTitle ?? ""}
          onClick={onPressButton}
          size="small"
          variant="outlined"
          buttonType={"outline-primary-small"}
        />
      )}
    </div>
  );
};

export default PageHeader;
