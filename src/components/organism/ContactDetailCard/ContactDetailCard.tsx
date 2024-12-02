import React from "react";
import { Icons } from "../../../../public/exporter";
import IconWithText from "@/components/molecules/IconWithText/IconWithText";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import CustomAccordion from "@/components/atoms/CustomAccordion/CustomAccordion";

export interface IContactCardProps {
  department?: string;
  email: string;
  phoneNumber: string;
  address?: string;
  isLoading?: boolean;
  link?: string;
  expanded?: boolean;
}

const ContactDetailCard: React.FC<IContactCardProps> = ({
  department,
  email,
  isLoading,
  phoneNumber,
  address,
  link,
  expanded,
}) => {
  const DetailListComponent = () => {
    return (
      <div className="flex flex-col gap-y-3 text-[14px] leading-[18px] text-Black">
        {department && (
          <IconWithText text={department} icon={Icons.companyBuilding} />
        )}
        {phoneNumber && (
          <IconWithText text={phoneNumber} icon={Icons.callIcon} />
        )}
        {email && <IconWithText text={email} icon={Icons.emailIcon} />}
        {address && <IconWithText text={address} icon={Icons.locationPin} />}
        {link && (
          <Link href={link} target="__blank">
            <IconWithText
              textStyle="text-externalLink"
              text={link}
              icon={Icons.externalLink}
            />
          </Link>
        )}
      </div>
    );
  };
  if (isLoading) {
    return (
      <div className="flex flex-col mt-3 border border-borderGrey rounded-lg p-4">
        <Skeleton variant="text" height={20} width={"30%"} />
        <div className="flex flex-col mt-5 leading-[18px] ">
          <Skeleton variant="text" height={32} width={"80%"} />
          <Skeleton variant="text" height={32} width={"80%"} />
          <Skeleton variant="text" height={32} width={"80%"} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col mt-3 border border-borderGrey rounded-lg px-4">
        {expanded ? (
          <CustomAccordion
            title="Contact Details"
            description={<DetailListComponent />}
            isExpanded= {expanded}
          />
        ) : (
          <CustomAccordion
            title="Contact Details"
            description={<DetailListComponent />}
          />
        )}

        {/* <h2 className="text-Black font-bold text-[16px] leading-[20px] mb-5">
          Contact Details
        </h2> */}
        {/* <div className="flex flex-col gap-y-3 text-[14px] leading-[18px] text-Black">
          {department && (
            <IconWithText text={department} icon={Icons.companyBuilding} />
          )}
          {phoneNumber && (
            <IconWithText text={phoneNumber} icon={Icons.callIcon} />
          )}
          {email && <IconWithText text={email} icon={Icons.emailIcon} />}
          {address && <IconWithText text={address} icon={Icons.locationPin} />}
          {link && (
            <Link href={link} target="__blank">
              <IconWithText
                textStyle="text-externalLink"
                text={link}
                icon={Icons.externalLink}
              />
            </Link>
          )}
        </div> */}
      </div>
    );
  }
};

export default ContactDetailCard;
