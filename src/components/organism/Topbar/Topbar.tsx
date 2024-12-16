"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import { Icons } from "../../../../public/exporter";
import { removeUserDetailsFromCookies } from "@/utility/cookies";
import CustomMenuComponent from "@/components/atoms/CustomMenuComponent/CustomMenuComponent";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { STRINGS } from "@/constant/en";
import ConfirmationDialog from "@/components/molecules/DialogTypes/ConfirmationDialog/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { routeNames } from "@/utility/routesName";
import { useShowLoaderContext } from "@/contexts/LoaderContext/LoaderContext";

const Topbar = () => {
  const userName = "Sumit";
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { changeLoaderState } = useShowLoaderContext();
  const route = useRouter();

  const logoutHandler = () => {
    setShowDialog(false);
    route.push(routeNames.Login);
    removeUserDetailsFromCookies();
    changeLoaderState(true);
  };

  const onPressClose = () => {
    setShowDialog(false);
  };

  const menuHandler = (option: string) => {
    if (option === STRINGS.myacc) {
      route.push(routeNames.Settings);
    }
    if (option === STRINGS.logout) {
      setShowDialog(true);
    }
  };
  return (
    <div className="text-disable flex bg-white justify-between border-b rounded-tl-[40px] border-borderGrey px-10 h-[8%]">
      <p className="my-[18px] text-[16px] leading-5 capitalize">
        Welcome, {userName}
      </p>

      <div className="flex items-center my-[10px] gap-x-3">
        <IconButton>
          <div className=" bg-backgroundLight rounded-full  w-9 h-9">
            <Image
              src={Icons.notification}
              alt="notification"
              className="w-auto h-auto p-[6px]"
            />
          </div>
        </IconButton>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <UserNameWithImage
              image={null}
              name={userName ?? ""}
              type="orange"
            />
            <CustomMenuComponent
              textSize="text-text-14"
              isOpen={false}
              data={[
                {
                  icon: Icons.user,
                  value: STRINGS.myacc,
                  onPresItem: (value: string) =>
                    menuHandler && menuHandler(value),
                },
                {
                  icon: Icons.logout,
                  value: STRINGS.logout,
                  onPresItem: (value: string) =>
                    menuHandler && menuHandler(value),
                },
              ]}
              menuButton={
                <Image
                  src={Icons.arrow}
                  alt="arrow"
                  className="w-auto h-auto"
                />
              }
            />
          </div>
        </div>
      </div>
      <ConfirmationDialog
        type={"logout"}
        onPressButton={logoutHandler}
        onClose={onPressClose}
        open={showDialog}
      />
    </div>
  );
};

export default Topbar;
