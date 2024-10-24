import React from "react";
import { Icons } from "../../../../public/exporter";
import IconWithText from "@/components/molecules/IconWithText/IconWithText";

export interface IContactCardProps {
  department?: string;
  email: string;
  phoneNumber: string;
  address?: string;
  link?: string;
}

const ContactCard: React.FC<IContactCardProps> = ({
  department,
  email,
  phoneNumber,
  address,
  link,
}) => {
  return (
    <div className="flex flex-col mt-3 border border-borderGrey rounded-lg p-4">
      <h2 className="text-Black font-bold text-[16px] leading-[20px] mb-5">
        Contact Details
      </h2>
      <div className="flex flex-col gap-y-3 text-[14px] leading-[18px] text-Black">
        {department && (
          <IconWithText text={department} icon={Icons.companyBuilding} />
        )}
        {email && <IconWithText text={email} icon={Icons.emailIcon} />}
        {phoneNumber && (
          <IconWithText text={phoneNumber} icon={Icons.callIcon} />
        )}
        {address && <IconWithText text={address} icon={Icons.locationPin} />}
        {link && <IconWithText text={link} icon={Icons.externalLink} />}
      </div>
    </div>
  );
};

export default ContactCard;
