import UserImageRenderer from '@/components/atoms/UserImageRenderer/UserImageRenderer';
import React from 'react';
import { IUserNameWithImageProps } from './UserNameWithImage.types';
import { formatDateFromNow } from '@/utility/utils';
import SVGComponent from '@/components/atoms/SvgComponent/SVGComponent';
import { SVGS } from '@/constant/staticSvgs';
import { Skeleton } from '@mui/material';

const UserNameWithImage: React.FC<IUserNameWithImageProps> = ({
  image,
  name,
  type,
  joinDate,
  companyName,
  days,
  containerStyle,
  companyNameStyle,
  isLoading,
  nameStyle,
  divStyle,
  imageStyle,
  postby,
  subText,
  postbyStyle,
  issueId,
  issuePublish,
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex flex-row  items-center justify-start">
        <Skeleton variant="circular" width={56} height={56} />
        <div className=" flex-1 ml-1">
          <Skeleton variant="text" width={'50%'} height={20} />
          <Skeleton variant="text" width={'50%'} height={20} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          'w-full flex flex-row  items-center justify-start ' + containerStyle
        }
      >
        <UserImageRenderer
          imageStyle={imageStyle ?? ''}
          image={image}
          name={name}
          type={type}
        />
        <div
          className={
            divStyle +
            ' ml-[10px]  flex flex-col flex-1 w-full  gap-y-1  capitalize'
          }
        >
          {name && (
            <span
              className={
                nameStyle +
                ' flex-1 text-[16px] leading-[20px] text-Black capitalize'
              }
            >
              {name}
            </span>
          )}
          {companyName && (
            <div className={companyNameStyle + ' flex w-full'}>
              <span>{companyName}</span>
            </div>
          )}

          {postby && (
            <div className={postbyStyle + ' flex gap-x-2 items-center w-full'}>
              <span>Posted by {postby}</span>{' '}
              {subText && (
                <>
                  <SVGComponent svg={SVGS.circleDot} />
                  <span className="text-[12px] leading-4 font-bold text-Red">
                    {subText}
                  </span>
                </>
              )}
            </div>
          )}
          {issueId && (
            <div className="flex gap-x-2 items-center w-full text-disable text-[12px] leading-4 ">
              <span>#{issueId}</span>{' '}
              {issuePublish && (
                <>
                  <SVGComponent svg={SVGS.circleDot} />
                  <span>{formatDateFromNow(issuePublish)}</span>
                </>
              )}
            </div>
          )}
          {days && (
            <span className="text-disable text-[12px] leading-[16px]">
              {formatDateFromNow(days)}{' '}
            </span>
          )}

          {joinDate && (
            <span className={'text-[14px] leading-[18px] w-full text-disable '}>
              Joined - {joinDate}
            </span>
          )}
        </div>
      </div>
    );
  }
};

export default UserNameWithImage;
