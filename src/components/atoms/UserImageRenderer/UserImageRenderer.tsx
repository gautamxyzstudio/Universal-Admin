/* eslint-disable @next/next/no-img-element */
'use client';
import {
  getStylesAttributes,
  IUserImageRendererProps,
} from './UserImageRenderer.types';
import { getFirstLetterFromName } from '@/utility/utils';
import Image from 'next/image';
import { base64Icon } from '../../../../public/exporter';

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
      {/* {isLoading && image && (
        <div className="flex absolute flex-row justify-center items-center bg-white z-10 rounded-full border border-borderGrey">
          <Image width={50} height={50} src={Icons.animatedSpinner} alt={''} />
        </div>
      )} */}

      {image && (
        <Image
          width={100}
          placeholder="blur"
          blurDataURL={base64Icon.spinner}
          height={100}
          className={
            imageStyle +
            ' object-contain relative  top-0 left-0 w-auto h-auto rounded-full border border-borderGrey'
          }
          src={image}
          alt={name}
        />
      )}
      {!image && name && (
        <div
          className={
            backgroundColor +
            ' flex flex-row justify-center items-center w-8 h-8 rounded-full border border-borderGrey'
          }
        >
          <p className={textColor + ' text-xl'}>
            {getFirstLetterFromName(name)}
          </p>
        </div>
      )}
    </>
  );
};

export default UserImageRenderer;
