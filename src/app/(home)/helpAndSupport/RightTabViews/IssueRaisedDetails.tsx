/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { IIssueRaisedById } from "@/api/fetures/HelpIssue/HelpIssueApi.types";
import CustomMenuComponent from "@/components/atoms/CustomMenuComponent/CustomMenuComponent";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { getIssueRaisedStatus } from "@/constant/constant";
import { getIssueRaisedStatusColor } from "@/utility/utils";
import { MoreVertOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Icons } from "../../../../../public/exporter";
import { STRINGS } from "@/constant/en";
import ContactDetailCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import { IIssueRaisedStatusEnum } from "@/constant/enums";
import { useGetIssueRaisedByIdQuery } from "@/api/fetures/HelpIssue/HelpIssueApi";

interface IIssueRaisedProps {
  messageId: number;
  markAsRead: (messageId: number) => void;
}
const IssueRaisedDetails: React.FC<IIssueRaisedProps> = ({
  messageId,
  markAsRead,
}) => {
  console.log(messageId);
  const { data } = useGetIssueRaisedByIdQuery(messageId);
  const [messageData, setMessageData] = useState<IIssueRaisedById | null>();

  useEffect(() => {
    if (data && data.isRead) {
      markAsRead(messageId);
    }
    setMessageData(data);
  }, [data, messageId]);

  const handleClosed = () => {
    console.log("closed");
    // handle closed issue
  };

  return (
    messageData && (
      <>
        <div className="flex justify-between items-center">
          {messageData.employeeDetails && (
            <UserNameWithImage
              name={messageData.employeeDetails?.employeeName ?? ""}
              image={messageData.employeeDetails?.employeeImageUrl ?? ""}
              imageStyle={"!w-14 !h-14"}
              issueId={messageData.id}
              issuePublish={messageData.publishedAt}
            />
          )}
          {messageData.clientDetails && (
            <UserNameWithImage
              name={messageData.clientDetails?.clientName ?? ""}
              image={messageData.clientDetails?.clientCompanyLogoUrl ?? ""}
              imageStyle={"!w-14 !h-14"}
              companyName={messageData.clientDetails?.clientCompanyName}
              companyNameStyle="text-disable text-[14px] leading-[18px]"
              issueId={messageData.id}
              issuePublish={messageData.publishedAt}
            />
          )}
          <div className="flex gap-x-3 items-center justify-center">
            <TextWithBgColor
              textLabel={getIssueRaisedStatus(messageData.issueStatus)}
              textStyle={getIssueRaisedStatusColor(messageData.issueStatus)}
            />
            {messageData.issueStatus === IIssueRaisedStatusEnum.OPEN && (
              <CustomMenuComponent
                isOpen={false}
                data={[
                  {
                    icon: Icons.closedMessage,
                    value: STRINGS.closed,
                    onPresItem: handleClosed,
                  },
                ]}
                menuButton={<MoreVertOutlined />}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-6 mt-4">
          {messageData.employeeDetails && (
            <ContactDetailCard
              email={messageData.employeeDetails?.employeeEmail ?? ""}
              phoneNumber={messageData.employeeDetails?.employeePhone ?? ""}
              expanded={true}
            />
          )}
          {messageData.clientDetails && (
            <ContactDetailCard
              email={messageData.clientDetails?.clientEmail ?? ""}
              phoneNumber={messageData.clientDetails?.clientPhone ?? ""}
              expanded={true}
            />
          )}
          <div className="flex flex-col gap-y-4">
            <span className="text-Black font-bold text-text-md">
              Issue Description:
            </span>
            <p className="text-[14px] leading-[18px] text-Black">
              {messageData && messageData.issue}
            </p>
          </div>
        </div>
      </>
    )
  );
};
export default IssueRaisedDetails;
