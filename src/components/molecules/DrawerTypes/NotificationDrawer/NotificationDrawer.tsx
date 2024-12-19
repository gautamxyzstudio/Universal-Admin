import CustomDrawer from "@/components/atoms/CustomDrawer/CustomDrawer";
import React from "react";
import { Icons } from "../../../../../public/exporter";
import { INotificationDrawerProps } from "./NotificationDrawer.types";
import Image from "next/image";
import { STRINGS } from "@/constant/en";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";

const NotificationDrawer: React.FC<INotificationDrawerProps> = ({
  open,
  handleClose,
  onPressCross,
}) => {
  const tabs = [
    {
      label: "Unread(4)",
    },
    {
      label: "View all",
    },
  ];
  return (
    <CustomDrawer styles={{ width: "436px" }} open={open} onClose={handleClose}>
      <div className="flex w-full h-fit justify-between items-center px-6 pb-2 pt-6 ">
        <h1 className="text-xl font-bold text-textBlack">
          {STRINGS.notification}
        </h1>
        <Image
          alt="close"
          className="cursor-pointer w-6 h-6"
          onClick={onPressCross}
          src={Icons.crossForm}
        />
      </div>
      <CustomTab
        tabOuterDivStyle=" border-0 !border-b pl-6"
        tabInnerDivStyle=" border-0"
        tabs={tabs}
        TabIndicatorProps={{
          style: {
            height: "3px",
            borderTopRightRadius: "3px",
            borderTopLeftRadius: "3px",
          },
        }}
        sx={{}}
      />
    </CustomDrawer>
  );
};

export default NotificationDrawer;
