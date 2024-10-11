'use client';
import React from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/Input/Input';
import { useState } from 'react';
import { Icons, Images } from '../../../public/exporter';

type ISearch = {
  searchText: string;
};

const Topbar = () => {
  const [data, setData] = useState<ISearch>({
    searchText: '',
  });
  return (
    <div className="text-disable flex  bg-white justify-between border-b rounded-tl-[40px] border-borderGrey  px-10">
      <p className="my-[18px] text-[16px] leading-5">Welcome, Admin</p>
      <div className="flex w-[424px] my-3 rounded pl-1 border gap-x-1 items-center">
        <Image src={Icons.search} alt="search" className="w-auto h-auto" />
        <Input
          placeholder="Search"
          value={data.searchText}
          onChange={(e) => {
            console.log(e.target.value);
            setData({
              searchText: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex items-center my-[10px] gap-x-4">
        <div className=" bg-extraWhite rounded-full  w-9 h-9">
          <Image
            src={Icons.notification}
            alt="notification"
            className="w-auto h-auto p-[6px]"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <Image
            src={Images.demoImg}
            alt="admin profile"
            className="w-[36px] h-[36px] bg-black rounded-full"
          />
          <div className="flex items-center gap-x-1">
            <span className="text-black text-[16px] leading-5">Admin Name</span>
            <Image src={Icons.arrow} alt="arrow" className="w-auto h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
