import UserImageRenderer from '@/components/atoms/UserImageRenderer/UserImageRenderer';
import React from 'react';
import { IUserNameWithImageProps } from './UserNameWithImage.types';
import { formatDateFromNow } from '@/utility/utils';

const UserNameWithImage: React.FC<IUserNameWithImageProps> = ({
  image,
  name,
  type,
  joinDate,
  companyName,
  days,
  containorStyle,
  companyNameStyle,
  nameStyle,
  divStyle,
  imageStyle,
}) => {
  return (
    <div className={"flex w-full gap-x-[10px] h-auto flex-row items-center justify-start " + containorStyle }>
      <UserImageRenderer
        imageStyle={imageStyle + ' !w-10 !h-10'}
        image={image}
        name={name}
        type={type}
      />
      <div className={divStyle + ' flex flex-col gap-y-1 w-full'}>
        {name && (
          <span
            className={nameStyle + ' text-[16px] leading-[20px] text-Black'}
          >
            {name}
          </span>
        )}
        {companyName && (
          <div className={companyNameStyle + ' flex gap-x-2 items-center w-full'}>
            <span>Posted by {companyName}</span>{' '}
            {days && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                >
                  <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
                </svg>{' '}
                <span>{formatDateFromNow(days)}</span>
              </>
            )}
          </div>
        )}
        {joinDate && (
          <span className="text-[14px] leading-[18px] text-disable">
            Joined - {joinDate}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserNameWithImage;
