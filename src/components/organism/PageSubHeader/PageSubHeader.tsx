'use client';
import Image from 'next/image';
import React, { memo } from 'react';
import { Icons } from '../../../../public/exporter';
import { useRouter } from 'next/navigation';
import { IPageSubHeaderTypes } from './PageSubHeader.types';

const PageSubHeader: React.FC<IPageSubHeaderTypes> = ({ pageTitle, name }) => {
  const router = useRouter();

  const onPressBack = () => {
    router.back();
  };
  return (
    <div className="flex items-center justify-start gap-x-3 text-base py-6 h-auto">
      <div onClick={onPressBack}>
        <span className="cursor-pointer text-disable">{pageTitle}</span>
      </div>
      <Image src={Icons.leftArrow} className="w-auto h-auto" alt="Left Arrow" />
      <span className="font-bold text-primary capitalize">{name}</span>
    </div>
  );
};

export default memo(PageSubHeader);
