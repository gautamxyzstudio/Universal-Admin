import UserImageRenderer from "@/components/atoms/UserImageRenderer/UserImageRenderer";
import { IUserImageRendererProps } from "@/components/atoms/UserImageRenderer/UserImageRenderer.types";
import React from "react";
import { IUserNameWithImageProps } from "./UserNameWithImage.types";

const UserNameWithImage: React.FC<IUserNameWithImageProps> = ({
  image,
  name,
  type,
  joinDate,
  companyName,
  companyNameStyle,
  nameStyle,
  imageStyle,
}) => {
  return (
    <div className="flex w-full gap-x-[10px] h-auto flex-row items-center justify-start">
      <UserImageRenderer imageStyle={imageStyle} image={image} name={name} type={type} />
      <div className={"flex flex-col gap-y-1"}>
        {name && (
          <span
            className={nameStyle + " text-[16px] leading-[20px] text-Black"}
          >
            {name}
          </span>
        )}
        {companyName && <span className={companyNameStyle}>{companyName}</span>}
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
