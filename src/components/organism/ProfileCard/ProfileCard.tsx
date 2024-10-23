import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

export interface IProfileCardProps {
  profileName?: string | undefined;
  joinDate?: string | undefined;
  companyName?: string | undefined;
  imageSrc: StaticImport;
  companyNameStyle?: string;
}

const ProfileCard: React.FC<IProfileCardProps> = ({
  profileName,
  joinDate,
  companyName,
  imageSrc,
  companyNameStyle,
}) => {
  return (
    <div className="flex gap-x-3 items-center">
      <Image
        alt="profile image"
        src={imageSrc}
        className="w-14 h-14 rounded-full"
      />
      <div className={"flex flex-col gap-y-1"}>
        {profileName && (
          <span className="text-[16px] leading-[20px] text-Black">
            {profileName}
          </span>
        )}
        {companyName && (
          <span className={companyNameStyle + " text-Black"}>
            {companyName}
          </span>
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

export default ProfileCard;
