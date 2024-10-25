import React from "react";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import IconWithText from "@/components/molecules/IconWithText/IconWithText";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";

export interface IconWithTextProps {
  text: string;
  icon: StaticImport;
}

interface IWorkHistoryCardProps {
  companyName: string;
  profileName: string;
  image: StaticImport;
  textLabel: string;
  textStyle: string;
  iconWithTexts: IconWithTextProps[];
}

const WorkHistortyCard: React.FC<IWorkHistoryCardProps> = ({
  companyName,
  profileName,
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
          companyNameStyle="text-disable text-[14px] leading-[18px]"
        />
        <TextWithBgColor
          textLabel={textLabel}
          textStyle={textStyle + " h-fit text-[12px] leading-4"}
        />
      </div>
      <div className="flex flex-col pl-2 gap-y-2">
        {iconWithTexts.map((item, index) => (
          <IconWithText
            key={index}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkHistortyCard;
