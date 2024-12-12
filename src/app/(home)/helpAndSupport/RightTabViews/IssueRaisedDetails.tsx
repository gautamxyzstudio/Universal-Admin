/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { MoreVertOutlined } from "@mui/icons-material";
import { IIssueRaisedById } from "@/api/fetures/HelpIssue/HelpIssueApi.types";
import CustomMenuComponent from "@/components/atoms/CustomMenuComponent/CustomMenuComponent";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import ContactDetailCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import ActivityIndicator from "@/components/atoms/ActivityIndicator/ActivityIndicator";
import { getIssueRaisedStatus } from "@/constant/constant";
import { getIssueRaisedStatusColor } from "@/utility/utils";
import { IIssueRaisedStatusEnum } from "@/constant/enums";
import { 
  useGetIssueRaisedByIdQuery,
  useUpdateIssueResolveMutation,
  useUpdateNotAnIssueMutation,
} from "@/api/fetures/HelpIssue/HelpIssueApi";
import { useShowLoaderContext } from "@/contexts/LoaderContext/LoaderContext";
import { useSnackBarContext } from "@/providers/SnackbarProvider";
import { Icons } from "../../../../../public/exporter";

interface IIssueRaisedProps {
  messageId: number;
  markAsRead: (messageId: number) => void;
  changedStatus: (issueId: number, status: IIssueRaisedStatusEnum) => void;
}

const IssueRaisedDetails: React.FC<IIssueRaisedProps> = ({
  messageId,
  markAsRead,
  changedStatus,
}) => {
  const { data, isLoading } = useGetIssueRaisedByIdQuery(messageId);
  const [messageData, setMessageData] = useState<IIssueRaisedById>();
  const [issueResolve] = useUpdateIssueResolveMutation();
  const [notAnIssue] = useUpdateNotAnIssueMutation();
  const { changeLoaderState } = useShowLoaderContext();
  const { displaySnackbar } = useSnackBarContext();

  useEffect(() => {
    if (data) {
      if (data.isRead) {
        markAsRead(messageId);
      }
      setMessageData(data);
    }
  }, [data, messageId]);

  const updateIssueStatus = async (
    action: () => Promise<any>,
    issueId: number
  ) => {
    try {
      changeLoaderState(true);
      const response = await action();

      if (response) {
        const updatedStatus = response.data.status;
        setMessageData((prev) =>
          prev ? { ...prev, issueStatus: updatedStatus } : undefined
        );
        changedStatus(issueId, updatedStatus);
        displaySnackbar("success", "Issue status updated");
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
    } finally {
      changeLoaderState(false);
    }
  };

  // Issue is Resolved
  const handleClosed = (issueId: number) => {
    updateIssueStatus(() => issueResolve(issueId).unwrap(), issueId);
  };

  // Issue is Not An Issue
  const handleNotAnIssue = (issueId: number) => {
    updateIssueStatus(() => notAnIssue(issueId).unwrap(), issueId);
  };

  if (isLoading) {
    return (
      <div className="w-full mt-2 flex justify-center items-center h-full">
        <ActivityIndicator size={36} />
      </div>
    );
  }

  if (!messageData) return null;

  const {
    employeeDetails,
    clientDetails,
    issue,
    issueStatus,
    id: issueId,
    publishedAt,
  } = messageData;

  return (
    <>
      <div className="flex justify-between items-center w-full">
        {employeeDetails && (
          <UserNameWithImage
            containerStyle="!w-[80%]"
            name={employeeDetails.employeeName || ""}
            image={employeeDetails.employeeImageUrl || ""}
            imageStyle="!w-14 !h-14"
            issueId={issueId}
            issuePublish={publishedAt}
          />
        )}
        {clientDetails && (
          <UserNameWithImage
            containerStyle="!w-[80%]"
            name={clientDetails.clientName || ""}
            image={clientDetails.clientCompanyLogoUrl || ""}
            imageStyle="!w-14 !h-14"
            companyName={clientDetails.clientCompanyName}
            companyNameStyle="text-disable text-[14px] leading-[18px]"
            issueId={issueId}
            issuePublish={publishedAt}
          />
        )}
        <div className="flex gap-x-3 items-center justify-end w-[20%]">
          <TextWithBgColor
            textLabel={getIssueRaisedStatus(issueStatus)}
            textStyle={getIssueRaisedStatusColor(issueStatus)}
          />
          {issueStatus === IIssueRaisedStatusEnum.OPEN && (
            <CustomMenuComponent
              isOpen={false}
              data={[
                {
                  icon: Icons.closedMessage,
                  value: getIssueRaisedStatus(IIssueRaisedStatusEnum.CLOSED),
                  onPresItem: () => handleClosed(messageId),
                },
                {
                  icon: Icons.notAnIssueMessage,
                  value: getIssueRaisedStatus(IIssueRaisedStatusEnum.NO_ISSUE),
                  onPresItem: () => handleNotAnIssue(messageId),
                },
              ]}
              menuButton={<MoreVertOutlined />}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-6 mt-4">
        {employeeDetails && (
          <ContactDetailCard
            email={employeeDetails.employeeEmail || ""}
            phoneNumber={employeeDetails.employeePhone || ""}
            expanded={true}
          />
        )}
        {clientDetails && (
          <ContactDetailCard
            email={clientDetails.clientEmail || ""}
            phoneNumber={clientDetails.clientPhone || ""}
            expanded={true}
          />
        )}
        <div className="flex flex-col gap-y-4">
          <span className="text-Black font-bold text-text-md">
            Issue Description:
          </span>
          <p className="text-[14px] leading-[18px] text-Black">{issue}</p>
        </div>
      </div>
    </>
  );
};

export default IssueRaisedDetails;
