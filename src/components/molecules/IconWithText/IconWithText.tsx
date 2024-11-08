import Image from 'next/image';
import React from 'react';
import { IIconWithTextProps } from './IconWithText.types';

const  IconWithText: React.FC<IIconWithTextProps> = ({
  text,
  subText,
  icon,
  iconStyle,
  textStyle,
}) => {
  return (
    <div className="flex items-center gap-x-1 text-Black">
      <Image alt={text} src={icon} className={'w-6 h-6 ' + iconStyle} />
      <div className={'flex gap-x-2 items-center ' + textStyle}>
        {text}
        {subText && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="22"
              viewBox="0 0 2 22"
              fill="none"
            >
              <path d="M1 1V21" stroke="#DBDBDB" stroke-linecap="round" />
            </svg>
            {subText}
          </>
        )}
      </div>
    </div>
  );
};

export default IconWithText;
