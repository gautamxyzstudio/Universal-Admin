'use client';
import Image from 'next/image';
import React, { memo } from 'react';
import { Icons } from '../../../../public/exporter';
import { useRouter } from 'next/navigation';
import { IPageSubHeaderTypes } from './PageSubHeader.types';
import { Skeleton } from '@mui/material';

const PageSubHeader: React.FC<IPageSubHeaderTypes> = ({
  pageTitle,
  name,
  isLoading,
}) => {
  const router = useRouter();

  const onPressBack = () => {
    router.back();
  };
  return (
    <div className="flex items-center justify-start gap-x-3 text-base py-6 h-auto">
      <div onClick={onPressBack}>
        <h1 className="cursor-pointer text-disable">{pageTitle}</h1>
      </div>
      <Image src={Icons.leftArrow} className="w-auto h-auto" alt="Left Arrow" />
      {isLoading ? (
        <Skeleton width={'15%'} />
      ) : (
        <h1 className="font-bold text-primary capitalize">{name}</h1>
      )}
    </div>
  );
};

export default memo(PageSubHeader);
