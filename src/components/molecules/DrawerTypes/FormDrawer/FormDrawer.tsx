import React from "react";
import { IFormDrawerProps } from "./FormDrawer.types";
import Image from "next/image";
import { Icons } from "../../../../../public/exporter";
import CustomDrawer from "@/components/atoms/CustomDrawer/CustomDrawer";

const FormDrawer: React.FC<IFormDrawerProps> = ({
  open,
  handleClose,
  title,
  children,
  onPressCross,
}) => {
  return (
    <CustomDrawer open={open} onClose={handleClose}>
      <div className="flex w-full h-fit justify-between items-center px-6 pb-2 pt-6 border-b border-borderGrey">
        <h1 className="text-xl font-bold text-textBlack">{title}</h1>
        <Image
          alt="close"
          className="cursor-pointer w-6 h-6"
          onClick={onPressCross}
          src={Icons.crossForm}
        />
      </div>
      <div className="flex flex-col h-screen justify-between">{children}
        
      </div>
    </CustomDrawer>
  );
};

export default FormDrawer;
