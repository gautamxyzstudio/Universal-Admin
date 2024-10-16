import CustomInput from "@/components/atoms/CustomInput/CustomInput";
// import { IconButton } from "@mui/material";
import React from "react";
import { Icons } from "../../../../../public/exporter";
import Image from "next/image";
import { ISelectInputProps } from "./CustomSelectInput.type";

const CustomSelectInput: React.FC<ISelectInputProps> = ({
  label,
  value,
  onChange,
  children,
}) => {
  return (
    <div className="inline-flex items-center gap-x-2 text-[12px] leading-4 h-8">
      {label}
      <CustomInput
        select
        value={value}
        onChange={onChange}
        size="small"
        sx={{
          "& .MuiSelect-select": {
            color: "#868686",
            fontSize: "12px",
            lineHeight: "16px",
          },
          width: "fit-content",
        }}
        slotProps={{
          select: {
            IconComponent: () => (
              <Image
                src={Icons.arrow}
                alt="Dropdown Menu"
                className="w-auto h-auto"
              />
            ),
          },
        }}
      >
        {children}
      </CustomInput>
    </div>
  );
};

export default CustomSelectInput;
