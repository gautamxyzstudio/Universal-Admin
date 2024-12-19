import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { dateMonthFormat } from "@/utility/utils";
import React from "react";
import { STRINGS } from "@/constant/en";
import { ICompanyClientDetails } from "@/api/fetures/Company/Company.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ContactDetailCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import TextGroup from "@/components/organism/TextGroup/TextGroup";
import { ITextGroupTypes } from "@/components/organism/TextGroup/TextGroup.types";

const ClientDetailsView = ({
  data,
  image,
}: {
  data: ICompanyClientDetails | null;
  image: StaticImport | string | null;
}) => {
  return (
    <>
      {data ? (
        <div className="w-full h-fit flex flex-col gap-y-6">
          <UserNameWithImage
            name={data.clientName ?? ""}
            image={image ?? ""}
            imageStyle="!w-14 !h-14"
            joinDate={dateMonthFormat(data.joinDate ?? "")}
          />
          <ContactDetailCard
            expanded={true}
            email={data.clientEmail ?? ""}
            phoneNumber={data.clientContactno ?? ""}
          />
          <div className="flex flex-col gap-y-8">
            <TextGroup
              title={STRINGS.company}
              text={data.clientCompanyName}
              type={ITextGroupTypes.detailPage}
            />
            <TextGroup
              title={STRINGS.industry}
              text={data.clientCompanyIndustry}
              type={ITextGroupTypes.detailPage}
            />
            <TextGroup
              title={STRINGS.clientAddress}
              text={data.clientLocation}
              type={ITextGroupTypes.detailPage}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-fit flex"> {STRINGS.noClients}</div>
      )}
    </>
  );
};

export default ClientDetailsView;
