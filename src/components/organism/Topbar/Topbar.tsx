import React from 'react';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { Icons, Images } from '../../../../public/exporter';

const Topbar = () => {
  return (
    <div className="text-disable flex bg-white justify-between border-b rounded-tl-[40px] border-borderGrey px-10 h-[8%]">
      <p className="my-[18px] text-[16px] leading-5">Welcome, Admin</p>

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
          <Image
            src={Images.demoImg}
            alt="admin profile"
            className="w-[36px] h-[36px] bg-black rounded-full"
          />
          <div className="flex items-center gap-x-1">
            <span className="text-Black text-[16px] leading-5">Admin Name</span>
            <Image src={Icons.arrow} alt="arrow" className="w-auto h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
