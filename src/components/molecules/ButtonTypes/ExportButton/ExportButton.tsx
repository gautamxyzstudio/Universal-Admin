import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import React from "react";
import { Icons } from "../../../../../public/exporter";
import Image from "next/image";

const ExportButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <CustomButton
      title="Export as"
      size="small"
      color="secondary"
      customStyles={{
        textTransform: "capitalize",
        "--variant-outlinedColor": "#868686",
        "--variant-outlinedBorder": "#868686",
      }}
      variant="outlined"
      onClick={onClick}
      buttonType={"outline-small-disabled"}
      iconPosition="right"
      icon={
        <Image
          src={Icons.excelfile}
          alt="Excel"
          className="w-auto h-auto ml-2"
        />
      }
    />
  );
};

export default ExportButton;
