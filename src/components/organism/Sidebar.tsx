'use client'
import { Icons } from "../../../public/exporter";
import Image from "next/image";
import React, { useState } from "react";
import { quickLink } from "@/api/mockData/data";
import Link from "next/link";

const Sidebar = () => {
  const [activeLinkId, setActiveLinkId] = useState<number | null>(null);

  const dataClick = (id: number) => {
    setActiveLinkId(id);
    console.log("Data Clicked", id);
  };
 
 return (
    <div className="my-6 flex flex-col justify-between">
      <Image
        className="cursor-pointer mx-auto"
        width={144}
        height={56}
        src={Icons.logo}
        alt="logo"
      />

      <div className="my-20 flex flex-col">
        {quickLink.slice(0, 6).map((data) => {
          const isActive = activeLinkId === data.id;
          return (
            <Link
              key={data.id}
              href={data.path}
              onClick={() => dataClick(data.id)}
              className={`m-6 flex items-center gap-x-3 ${isActive ? 'font-bold text-white ' : 'text-secondary'}`}
            >
              <Image
               src= {isActive ? data.iconfill : data.icon}
                alt={data.title}
                className="w-auto h-auto"
              />
              <span className="text-[16px] leading-5">{data.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-20 flex flex-col">
        {quickLink.slice(6).map((data) => {
          const isActive = activeLinkId === data.id;
          return (
            <Link
              key={data.id}
              href={data.path}
              onClick={() => dataClick(data.id)}
              className='m-6 flex items-center gap-x-3'
            >
              <Image
                src={isActive? data.iconfill : data.icon}
                alt={data.title}
                className="w-auto h-auto"
              />
              <span className="text-[16px] leading-5">{data.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
