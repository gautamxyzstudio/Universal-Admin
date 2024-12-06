import { IIssueRaisedByEmployee } from "@/api/fetures/HelpIssue/HelpIssueApi.types";
import CustomMenuComponent from "@/components/atoms/CustomMenuComponent/CustomMenuComponent";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { getJobStatus } from "@/constant/constant";
import { getJobStatusColor } from "@/utility/utils";
import { MoreVertOutlined } from "@mui/icons-material";
import React from "react";
import { Icons } from "../../../../../public/exporter";
import { STRINGS } from "@/constant/en";
import ContactDetailCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import { IJobPostStatus } from "@/constant/enums";

interface IIssueRaisedProps {
  data: IIssueRaisedByEmployee;
}
const IssueRaisedDetails: React.FC<IIssueRaisedProps> = ({ data }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <UserNameWithImage
          name={data.employeeName ?? ""}
          image={null}
          imageStyle={"!w-14 !h-14"}
          issueId={data.id}
          issuePublish={data.publishedAt}
        />
        <div className="flex gap-x-3 items-center justify-center">
          <TextWithBgColor
            textLabel={getJobStatus(data.issueStatus)}
            textStyle={getJobStatusColor(data.issueStatus)}
          />
          {data.issueStatus === IJobPostStatus.OPEN && (
            <CustomMenuComponent
              isOpen={false}
              data={[
                {
                  icon: Icons.closedMessage,
                  value: STRINGS.closed,
                  onPresItem: () => console.log(STRINGS.close),
                },
              ]}
              menuButton={<MoreVertOutlined />}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-6 mt-4">
        <ContactDetailCard
          email={data.employeeEmail ?? ""}
          phoneNumber={data.employeePhone ?? ""}
          expanded={true}
        />
        <div className="flex flex-col gap-y-4">
          <span className="text-Black font-bold text-text-md">
            Issue Description:
          </span>
          <p className="text-[14px] leading-[18px] text-Black">{data.issue}</p>
        </div>
      </div>
    </>
  );
};
export default IssueRaisedDetails;
