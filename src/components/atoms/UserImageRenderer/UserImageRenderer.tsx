import React from 'react';
import {
  getStylesAttributes,
  IUserImageRendererProps,
} from './UserImageRenderer.types';
import Image from 'next/image';
import { getFirstLetterFromName } from '@/utility/utils';

const UserImageRenderer: React.FC<IUserImageRendererProps> = ({
  name,
  image,
  type,
}) => {
  const stylesAttributes = getStylesAttributes(type);
  const backgroundColor = `${stylesAttributes.backgroundColor}`;
  const textColor = `${stylesAttributes.textColor}`;
  return (
    <div>
      {image && (
        <Image className="w-8 h-8 rounded-full" src={image} alt={name} />
      )}
      {!image && name && (
        <div
          className={
            backgroundColor +
            ' flex flex-row justify-center items-center w-8 h-8 rounded-full'
          }
        >
          <p className={textColor + ' text-sm'}>
            {getFirstLetterFromName(name)}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserImageRenderer;
