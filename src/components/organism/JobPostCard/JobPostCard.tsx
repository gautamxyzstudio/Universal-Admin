import React from 'react';
import IconWithText from '@/components/molecules/IconWithText/IconWithText';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import { IJobPostCardProps } from './JobPostCard.types';

const JobPostCard: React.FC<IJobPostCardProps> = ({
  companyName,
  profileName,
  postByName,
  days,
  image,
  iconWithTexts,
}) => {
  return (
    <div className="flex-col   rounded-[8px]  w-full">
      <div className="flex justify-between w-full">
        <UserNameWithImage
          image={image ?? ''}
          name={profileName}
          nameStyle="font-bold"
          imageStyle="!w-9 !h-9"
          companyName={companyName}
          postby={postByName}
          days={days}
          companyNameStyle="text-disable text-[14px] leading-[18px]"
          postbyStyle="text-disable text-[14px] leading-[18px]"
        />
      </div>
      <div className="flex flex-col pl-2 mt-4 gap-y-2 w-full">
        {iconWithTexts.map((item, index) => (
          <IconWithText
            key={index}
            text={item.text}
            subText={item.subText}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPostCard;
