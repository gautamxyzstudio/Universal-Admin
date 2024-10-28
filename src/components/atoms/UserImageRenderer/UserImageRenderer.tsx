/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  getStylesAttributes,
  IUserImageRendererProps,
} from './UserImageRenderer.types';
import { getFirstLetterFromName } from '@/utility/utils';
import Image from 'next/image';

const UserImageRenderer: React.FC<IUserImageRendererProps> = ({
  name,
  image,
  type,
  imageStyle,
}) => {
  const stylesAttributes = getStylesAttributes(type);
  const backgroundColor = `${stylesAttributes.backgroundColor}`;
  const textColor = `${stylesAttributes.textColor}`;
  return (
    <>
      {image && (
        <Image
          width={100}
          height={100}
          className={imageStyle + ' object-cover  h-auto w-auto rounded-full'}
          src={image}
          alt={name}
        />
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
    </>
  );
};

export default UserImageRenderer;
