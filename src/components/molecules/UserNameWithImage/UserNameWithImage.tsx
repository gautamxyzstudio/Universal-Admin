import UserImageRenderer from '@/components/atoms/UserImageRenderer/UserImageRenderer';
import { IUserImageRendererProps } from '@/components/atoms/UserImageRenderer/UserImageRenderer.types';
import React from 'react';

const UserNameWithImage: React.FC<IUserImageRendererProps> = ({
  image,
  name,
  type,
}) => {
  return (
    <div className="flex w-full   gap-x-[10px] h-full  flex-row items-center justify-start">
      <UserImageRenderer image={image} name={name} type={type} />
      <p className="text-black text-sm">{name}</p>
    </div>
  );
};

export default UserNameWithImage;
