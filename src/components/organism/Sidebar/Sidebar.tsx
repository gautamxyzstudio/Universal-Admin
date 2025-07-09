'use client';
import { Icons } from '../../../../public/exporter';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IQuickLinkData, quickLink } from '@/api/mockData/data';
import { STRINGS } from '@/constant/en';
import { usePathname, useRouter } from 'next/navigation';
import { routeNames } from '@/utility/routesName';
import { splitRoute } from '@/utility/utils';
import LinkWithImageRender from '@/components/atoms/LinkWithImageRender/LinkWithImageRender';
import { removeUserDetailsFromCookies } from '@/utility/cookies';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import ConfirmationDialog from '@/components/molecules/DialogTypes/ConfirmationDialog/ConfirmationDialog';

const Sidebar = () => {
  const currentPathName = usePathname();
  const router = useRouter();
  const { changeLoaderState } = useShowLoaderContext();
  const [index, setIndex] = useState(0);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    const index = quickLink.findIndex(
      (link) => link.path === `/${splitRoute(currentPathName)}`
    );
    if (index === index) {
      setIndex(index);
    }
  }, [currentPathName]);

  const SideBarTab = (
    data: IQuickLinkData,
    index: number,
    isActive: boolean
  ) => {
    return (
      <LinkWithImageRender
        key={data.id}
        href={data.path}
        icon={isActive ? data.iconfill : data.icon}
        title={data.title}
        isActive={isActive}
      />
    );
  };

  const RenderSettings = () => {
    const isActive = `/${splitRoute(currentPathName)}` === routeNames.Settings;

    return (
      <LinkWithImageRender
        href={routeNames.Settings}
        icon={isActive ? Icons.settingfill : Icons.setting}
        title={STRINGS.settings}
        isActive={isActive}
      />
    );
  };
  const RenderHelp = () => {
    const isActive = `/${splitRoute(currentPathName)}` === routeNames.Help;
    return (
      <LinkWithImageRender
        href={routeNames.Help}
        icon={isActive ? Icons.helpFill : Icons.help}
        title={STRINGS.help}
        isActive={isActive}
      />
    );
  };

  const RenderLogout = () => {
    const logoutHandler = () => {
      setShowDialog(false);
      router.push(routeNames.Login);
      removeUserDetailsFromCookies();
      changeLoaderState(true);
    };

    const onPressClose = () => {
      setShowDialog(false);
    };

    const handleLogoutClick = () => {
      setShowDialog(true);
    };

    return (
      <>
        <LinkWithImageRender
          href="#"
          icon={Icons.logoutDisabled}
          title={STRINGS.logout}
          isActive={false}
          onClickOption={handleLogoutClick}
        />
        <ConfirmationDialog
          type={'logout'}
          onPressButton={logoutHandler}
          onClose={onPressClose}
          open={showDialog}
        />
      </>
    );
  };

  return (
    <div className="pt-6 h-screen flex flex-col relative">
      <Image
        className="cursor-pointer mx-auto"
        width={144}
        priority
        height={56}
        src={Icons.logo}
        alt="logo"
      />
      <div className="w-full h-full  flex flex-col justify-between">
        <div className="flex justify-between flex-col relative">
          {/* Vertical indicator */}
          {index > -1 && (
            <div
              className={`h-[72px] w-1 bg-primary rounded-custom absolute transition-transform duration-300 ease-in-out`}
              style={{
                transform: `translateY(${index * 72}px)`,
              }} // Use inline style for translation
            />
          )}

          {quickLink.map((data, index) => {
            const isActive = `/${splitRoute(currentPathName)}` === data.path;
            return SideBarTab(data, index, isActive);
          })}
        </div>
        <div>
          {RenderSettings()}
          {RenderHelp()}
          {RenderLogout()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
