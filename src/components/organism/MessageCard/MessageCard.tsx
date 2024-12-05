import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import React from "react";
import { IMessageCardProps } from "./MessageCard.types";

const MessageCard: React.FC<IMessageCardProps> = ({
  isClient,
  companyName,
  profileName,
  issueId,
  issuePublish,
  image,
  textLabel,
  textStyle,
  message,
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between w-full">
        <UserNameWithImage
          image={image ?? ""}
          name={profileName}
          nameStyle="font-bold"
          imageStyle="!w-9 !h-9"
          companyName={isClient ? companyName : null}
          issueId={issueId}
          issuePublish={issuePublish}
          companyNameStyle="text-disable text-[14px] leading-[18px]"
        />
        {textLabel && textStyle && (
          <TextWithBgColor
            textLabel={textLabel}
            textStyle={textStyle + " absolute top-[12px] right-[12px]"}
          />
        )}
      </div>
      <div className="px-2 text-text-md text-disable">{message.slice(0,70)}....</div>
    </div>
  );
};

export default MessageCard;
