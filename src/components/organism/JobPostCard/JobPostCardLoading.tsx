import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import { Skeleton } from '@mui/material';
import React from 'react';

const JobPostCardLoading = () => {
  return (
    <div className="flex-col   rounded-[8px]  w-full">
      <div className="flex justify-between w-full">
        <UserNameWithImage
          image={''}
          name={''}
          nameStyle="font-bold"
          imageStyle="!w-9 !h-9"
          companyName={''}
          postby={''}
          isLoading={true}
          days={''}
          companyNameStyle="text-disable text-[14px] leading-[18px]"
          postbyStyle="text-disable text-[14px] leading-[18px]"
        />
      </div>
      <div className="flex flex-col pl-2 mt-4 gap-y-2 w-full">
        <Skeleton variant="text" width={'80%'} height={20} />
        <Skeleton variant="text" width={'80%'} height={20} />
        <Skeleton variant="text" width={'80%'} height={20} />
      </div>
    </div>
  );
};

export default JobPostCardLoading;
