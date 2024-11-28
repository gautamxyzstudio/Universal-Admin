import React from "react";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import IconWithText from "@/components/molecules/IconWithText/IconWithText";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { IJobPostCardProps } from "./JobPostCard";

const JobPostCard: React.FC<IJobPostCardProps> = ({
  companyName,
  profileName,
  postByName,
  days,
  image,
  textLabel,
  textStyle,
  iconWithTexts,
}) => {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex justify-between w-full">
        <UserNameWithImage
          image={image}
          name={profileName}
          nameStyle="font-bold"
          imageStyle="!w-9 !h-9"
          companyName={companyName}
          postBy={postByName}
          days={days}
          companyNameStyle="text-disable text-[14px] leading-[18px]"
          postByStyle="text-disable text-[14px] leading-[18px]"
        />
        <TextWithBgColor
          textLabel={textLabel}
          textStyle={textStyle + " absolute right-[8px] top-[4px]"}
        />
      </div>
      <div className="flex flex-col pl-2 gap-y-2 w-full">
        {iconWithTexts.map((item, index) => (
          <IconWithText
            key={index}
            text={item.text}
            subText={item.subText}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPostCard;
