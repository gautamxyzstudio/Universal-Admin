import React from 'react';
import {
  getTextGroupStyles,
  ITextGroupProps,
  ITextGroupTypes,
} from './TextGroup.types';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

const TextGroup: React.FC<ITextGroupProps> = ({
  title,
  subTitle,
  titleStyle,
  text,
  subText,
  type = ITextGroupTypes.default,
  textStyle,
  isLoading,

  icon,
}) => {
  const styles = getTextGroupStyles(type);
  if (isLoading) {
    return (
      <div className={'flex   items-center gap-x-1 h-fit' + styles.divStyle}>
        {icon && <Skeleton variant="circular" width={24} height={24} />}
        <div className=" items-center gap-x-1 h-fit">
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={100} height={20} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={'flex items-center gap-x-1 h-fit ' + styles.divStyle}>
        {icon && <Image src={icon} alt={title} className="w-6 h-6" />}
        <div className={styles.textgroupStyle}>
          <div
            className={'flex gap-x-3 items-center text-disable ' + titleStyle}
          >
            {title}
            {subTitle && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="14"
                  viewBox="0 0 2 14"
                  fill="none"
                >
                  <path d="M1 1V13" stroke="#DBDBDB" stroke-linecap="round" />
                </svg>
                {subTitle}
              </>
            )}
          </div>
          <div className={'flex gap-x-3 items-center  text-Black' + textStyle}>
            {text}
            {subText && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="14"
                  viewBox="0 0 2 14"
                  fill="none"
                >
                  <path d="M1 1V13" stroke="#DBDBDB" stroke-linecap="round" />
                </svg>
                {subText}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default TextGroup;
