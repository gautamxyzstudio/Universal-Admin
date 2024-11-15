import UserImageRenderer from "@/components/atoms/UserImageRenderer/UserImageRenderer";
import React from "react";
import { IUserNameWithImageProps } from "./UserNameWithImage.types";
import { formatDateFromNow } from "@/utility/utils";
import SVGComponent from "@/components/atoms/SvgComponent/SVGComponent";
import { SVGS } from "@/constant/staticSvgs";

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
 postby,
  subText,
  postbyStyle,
}) => {
  return (
    <div
      className={
        "flex w-full gap-x-[10px] h-auto flex-row items-center justify-start " +
        containorStyle
      }
    >
      <UserImageRenderer
        imageStyle={imageStyle + " !w-10 !h-10"}
        image={image}
        name={name}
        type={type}
      />
      <div className={divStyle + " flex flex-col gap-y-1 w-full capitalize"}>
        {name && (
          <span
            className={nameStyle + " text-[16px] leading-[20px] text-Black capitalize"}
          >
            {name}
          </span>
        )}
        {companyName && (
          <div
            className={companyNameStyle + " flex gap-x-2 items-center w-full"}
          >
            <span>{companyName}</span>{" "}
            
            {days && (
              <>
                <SVGComponent svg={SVGS.circleDot} />
                <span>{formatDateFromNow(days)} </span>
              </>
            )}
          </div>
        )}
        {postby && (
          <div
            className={postbyStyle + " flex gap-x-2 items-center w-full"}
          >
            <span>Posted by {postby}</span>{" "}
            {subText && (
              <>
                <SVGComponent svg={SVGS.circleDot} />
                <span className="text-[12px] leading-4 font-bold text-red">
                  {subText}
                </span>
              </>
            )}
            {days && (
              <>
                <SVGComponent svg={SVGS.circleDot} />
                <span>{formatDateFromNow(days)} </span>
              </>
            )}
          </div>
        )}
        {joinDate && (
          <span className={"text-[14px] leading-[18px] w-full text-disable " }>
            Joined - {joinDate}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserNameWithImage;
