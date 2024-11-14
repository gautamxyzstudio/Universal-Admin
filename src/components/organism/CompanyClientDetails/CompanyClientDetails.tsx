import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { dateMonthFormat } from "@/utility/utils";
import React from "react";
import ContactDetailCard from "../ContactDetailCard/ContactDetailCard";
import TextGroup from "../TextGroup/TextGroup";
import { STRINGS } from "@/constant/en";

const CompanyClientDetails = ({ data, image }) => {
  return (
    <>
      {data && data !== "" ? (
        <div className="w-full h-fit flex flex-col gap-y-6">
          <UserNameWithImage
            name={data?.Name}
            image={image}
            joinDate={dateMonthFormat(data?.publishedAt)}
          />
          <ContactDetailCard
            email={data?.Email}
            phoneNumber={data?.contactno}
          />
          <div className="flex flex-col gap-y-8">
            <TextGroup
              title={STRINGS.company}
              text={data?.company_detail?.companyname}
            />
            <TextGroup
              title={STRINGS.industry}
              text={data?.company_detail?.Industry}
            />
            <TextGroup title={STRINGS.clientAddress} text={data?.location} />
          </div>
        </div>
      ) : (
        <div className="w-full h-fit flex"> {STRINGS.noClients}</div>
      )}
    </>
  );
};

export default CompanyClientDetails;
