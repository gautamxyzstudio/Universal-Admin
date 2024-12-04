"use client";
import React from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import { Icons } from "../../../../public/exporter";
import { getUserNameFormCookies } from "@/utility/cookies";
// const adminName = getUserNameFormCookies();
const Topbar = () => {
  const userName = getUserNameFormCookies();

  return (
    <div className="text-disable flex bg-white justify-between border-b rounded-tl-[40px] border-borderGrey px-10 h-[8%]">
      <span className="my-[18px] text-[16px] leading-5">
        Welcome, {userName}
      </span>

      <div className="flex items-center my-[10px] gap-x-4">
        <IconButton>
          <div className=" bg-extraWhite rounded-full  w-9 h-9">
            <Image
              src={Icons.notification}
              alt="notification"
              className="w-auto h-auto p-[6px]"
            />
          </div>
        </IconButton>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <span className="text-Black text-[16px] leading-5">{userName}</span>
            <Image src={Icons.arrow} alt="arrow" className="w-auto h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
