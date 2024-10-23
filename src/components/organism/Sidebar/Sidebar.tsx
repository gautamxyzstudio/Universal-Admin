'use client';
import { Icons } from '../../../../public/exporter';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IQuickLinkData, quickLink } from '@/api/mockData/data';
import Link from 'next/link';
import { STRINGS } from '@/constant/en';
import ConfirmationDialog from '../../molecules/DialogTypes/ComfirmationDialog/ConfirmationDialog';
import { removeUserDetailsFromCookies } from '@/utility/cookies';
import { usePathname, useRouter } from 'next/navigation';
import { routeNames } from '@/utility/routesName';

const Sidebar = () => {
  const [translateY, setTranslateValue] = useState(0);

  const currentPathName = usePathname();

  useEffect(() => {
    if (currentPathName) {
      const index = quickLink.findIndex(
        (link) => link.path === currentPathName
      );
      if (index !== -1) {
        setTranslateValue(index * 72); // Set translateY based on the current path
      }
    }
  }, [currentPathName]); // Ensure the useEffect depends on currentPathName

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const route = useRouter();

  const onPressClose = () => {
    setShowDialog(false);
  };

  const onPressLogout = () => {
    setShowDialog(true);
  };

  const logoutHandler = () => {
    setShowDialog(false);
    removeUserDetailsFromCookies();
    route.push(routeNames.Login);
  };

  const SideBarTab = (
    data: IQuickLinkData,
    index: number,
    isActive: boolean
  ) => {
    return (
      <Link
        key={data.id}
        href={data.path}
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
  };

  return (
    <div className="pt-6 h-screen flex flex-col relative">
      <Image
        className="cursor-pointer mx-auto"
        width={144}
        height={56}
        src={Icons.logo}
        alt="logo"
      />
      <div className="w-full h-full mt-16 flex flex-col justify-between">
        <div className="flex justify-between flex-col relative">
          {/* Vertical indicator */}
          <div
            className={`h-[72px] w-1 bg-primary rounded-custom absolute transition-transform duration-300 ease-in-out`}
            style={{ transform: `translateY(${translateY}px)` }} // Use inline style for translation
          />
          {quickLink.map((data, index) => {
            const isActive = currentPathName === data.path;
            return SideBarTab(data, index, isActive);
          })}
        </div>
        <div>
          <div
            className={`flex cursor-pointer flex-row pl-6 max-w-full h-[72px] items-center gap-x-3`}
          >
            <Image src={Icons.setting} alt={'settings'} className="w-6 h-6" />
            <span className={'text-md text-disable'}>{STRINGS.settings}</span>
          </div>
          <div
            onClick={onPressLogout}
            className={`flex cursor-pointer flex-row pl-6 max-w-full h-[72px] items-center gap-x-3`}
          >
            <Image src={Icons.logout} alt={'logout'} className="w-6 h-6" />
            <span className={'text-md text-disable'}>{STRINGS.logout}</span>
          </div>
        </div>
        <ConfirmationDialog
          type={'logout'}
          onPressLogout={logoutHandler}
          onClose={onPressClose}
          open={showDialog}
        />
      </div>
    </div>
  );
};

export default Sidebar;
