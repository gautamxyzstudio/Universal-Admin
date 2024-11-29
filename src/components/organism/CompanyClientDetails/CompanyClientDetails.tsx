import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { dateMonthFormat } from "@/utility/utils";
import React from "react";
import ContactDetailCard from "../ContactDetailCard/ContactDetailCard";
import TextGroup from "../TextGroup/TextGroup";
import { STRINGS } from "@/constant/en";
import { ITextGroupTypes } from "../TextGroup/TextGroup.types";

const CompanyClientDetails = ({ data, image }) => {
  return (
    <>
      {data && data !== "" ? (
        <div className="w-full h-fit flex flex-col gap-y-6">
          <UserNameWithImage
            name={data?.Name}
            image={image}
            imageStyle="!w-14 !h-14"
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
              type={ITextGroupTypes.detailPage}
            />
            <TextGroup
              title={STRINGS.industry}
              text={data?.company_detail?.Industry}
              type={ITextGroupTypes.detailPage}
            />
            <TextGroup title={STRINGS.clientAddress} text={data?.location}  type={ITextGroupTypes.detailPage} />
          </div>
        </div>
      ) : (
        <div className="w-full h-fit flex"> {STRINGS.noClients}</div>
      )}
    </>
  );
};

export default CompanyClientDetails;
