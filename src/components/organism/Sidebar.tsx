'use client';
import { Icons } from '../../../public/exporter';
import Image from 'next/image';
import React, { useState } from 'react';
import { quickLink } from '@/api/mockData/data';
import Link from 'next/link';

const Sidebar = () => {
  const [translateY, setTranslateValue] = useState(0);
  const [activeLinkId, setActiveLinkId] = useState<number | null>(
    quickLink[0].id
  );

  const dataClick = (id: number, index: number) => {
    setActiveLinkId(id);
    setTranslateValue(index * 72);
  };

  return (
    <div className="my-6 flex flex-col justify-between relative">
      <Image
        className="cursor-pointer mx-auto"
        width={144}
        height={56}
        src={Icons.logo}
        alt="logo"
      />

      <div className="mt-16 flex flex-col relative">
        {/* Vertical indicator */}
        <div
          className={`h-[72px] w-1 bg-primary rounded-custom absolute transition-transform duration-300 ease-in-out`}
          style={{ transform: `translateY(${translateY}px)` }} // Use inline style for translation
        />
        {quickLink.map((data, index) => {
          const isActive = activeLinkId === data.id;
          return (
            <Link
              key={data.id}
              href={data.path}
              onClick={() => dataClick(data.id, index)}
              className={`flex flex-row pl-6 max-w-full h-[72px] items-center gap-x-3`}
            >
              <Image
                src={isActive ? data.iconfill : data.icon}
                alt={data.title}
                className="w-6 h-6"
              />
              <span
                className={`text-md ${
                  isActive ? 'font-bold text-primary' : 'text-disable'
                }`}
              >
                {data.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
