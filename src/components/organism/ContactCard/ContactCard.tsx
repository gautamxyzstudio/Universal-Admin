import Image from "next/image";
import React from "react";
import { Icons } from "../../../../public/exporter";

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
          <div className="inline-flex gap-x-2">
            <Image
              alt="department building"
              src={Icons.companyBuilding}
              className="w-auto h-auto"
            />
            {department}
          </div>
        )}
        {email && (
          <div className="inline-flex gap-x-2">
            <Image
              alt="department building"
              src={Icons.emailIcon}
              className="w-5 h-5"
            />
            {email}
          </div>
        )}
        {phoneNumber && (
          <div className="inline-flex gap-x-2">
            <Image
              alt="department building"
              src={Icons.callIcon}
              className="w-5 h-5"
            />
            {phoneNumber}
          </div>
        )}
        {address && (
          <div className="inline-flex gap-x-2">
            <Image
              alt="department building"
              src={Icons.locationPin}
              className="w-5 h-5"
            />
            {address}
          </div>
        )}
        {link && (
          <div className="inline-flex gap-x-2 text-externalLink">
            <Image
              alt="department building"
              src={Icons.externalLink}
              className="w-5 h-5"
            />
            {link}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
