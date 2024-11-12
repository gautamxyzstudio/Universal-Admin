import Image from 'next/image';
import React from 'react';
import { IIconWithTextProps } from './IconWithText.types';
import { SVGS } from '@/constant/staticSvgs';
import SVGComponent from '@/components/atoms/SvgComponent/SVGComponent';

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
            <SVGComponent svg={SVGS.horizontalLine} />
            {subText}
          </>
        )}
      </div>
    </div>
  );
};

export default IconWithText;
