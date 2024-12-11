/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import VirtualList from "@/components/molecules/VirtualList/VirtualList";
import React, { useCallback, useEffect, useState } from "react";
import TabButton from "@/components/molecules/ButtonTypes/TabButton/TabButton";
import { useDemoData } from "@mui/x-data-grid-generator";
import { STRINGS } from "@/constant/en";

import { Skeleton } from "@mui/material";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import MessageCard from "@/components/organism/MessageCard/MessageCard";
import { Images } from "../../../../../public/exporter";
import {
  IIssueRaisedByClient,
  IIssueRaisedByEmployee,
} from "@/api/fetures/HelpIssue/HelpIssueApi.types";
import { getIssueRaisedStatusColor } from "@/utility/utils";
import { getIssueRaisedStatus } from "@/constant/constant";
type IMessageCardsListProps = {
  data: IIssueRaisedByEmployee[] | IIssueRaisedByClient[];
  isLoading: boolean;
  isLastPage: boolean;
  onReachEnd: (index: number) => void;
  selectedIssueId: number | null | string;
  onPressButton: (messageId: number | null) => void;
  markAsRead: (messageId: number) => void;
};

const MessageCardsList: React.FC<IMessageCardsListProps> = ({
  data,
  isLoading,
  isLastPage,
  selectedIssueId,
  onReachEnd,
  onPressButton,
  markAsRead,
}) => {
  const [message, setMessage] = useState<
    IIssueRaisedByEmployee[] | IIssueRaisedByClient[]
  >([]);
  useEffect(() => {
    if (data) {
      setMessage(data);
    }
  }, [data]);

  const { data: demoData } = useDemoData({
    rowLength: 5,
    maxColumns: 9,
    dataSet: "Employee",
  });
  const renderItemLoading = () => {
    return (
      <TabButton
        content={
          <div className="flex w-full flex-col gap-y-2">
            <div className="flex gap-x-2 w-full">
              <Skeleton variant="circular" width="60px" height="50px" />
              <div className="flex flex-col gap-x-1 w-full">
                <Skeleton variant="text" width="40%" height={30} />
                <Skeleton variant="text" width="60%" height={20} />
              </div>
              <div className="flex justify-end w-1/2">
                <Skeleton variant="rounded" width="20%" height={15} />
              </div>
            </div>
            <div>
              <Skeleton variant="text" width="100%" height={30} />
              <Skeleton variant="text" width="60%" height={30} />
            </div>
          </div>
        }
        isSelected={false}
      ></TabButton>
    );
  };

  const renderItem = useCallback(
    (_: number, item: IIssueRaisedByEmployee | IIssueRaisedByClient) => {
      return (
        <TabButton
          customButtonStyle={{
            padding: "12px",
            borderBottom: "1px solid #DBDBDB",
            borderLeft: item.isRead === null ? "4px solid #182452" : "none",
          }}
          key={item.id}
          content={
            "employeeName" in item ? (
              <MessageCard
                profileName={item.employeeName ?? ""}
                issueId={item.id}
                issuePublish={item.publishedAt}
                message={item.issue ?? ""}
                image={item.employeeImageUrl}
                textLabel={getIssueRaisedStatus(item.issueStatus)}
                textStyle={getIssueRaisedStatusColor(item.issueStatus)}
              />
            ) : (
              <MessageCard
                profileName={item.clientName ?? ""}
                companyName={item.clientCompanyName ?? ""}
                issueId={item.id}
                issuePublish={item.publishedAt}
                message={item.issue ?? ""}
                image={item.clientCompanyLogoUrl}
                textLabel={getIssueRaisedStatus(item.issueStatus)}
                textStyle={getIssueRaisedStatusColor(item.issueStatus)}
              />
            )
          }
          isSelected={selectedIssueId === item.id}
          onPressButton={() => {
            onPressButton(item.id);
            console.log(item.id, "when pressed");
            markAsRead(item.id);
          }}
        />
      );
    },
    [selectedIssueId, data]
  );
  return (
    <div className="h-[inherit] pb-4 w-full">
      <VirtualList
        data={isLoading ? demoData.rows : message}
        isLastPage={isLastPage}
        onReachEnd={onReachEnd}
        illustration={Images.noHelpSupport}
        illustrationStyes="!w-40 !h-40"
        emptyViewTitle={STRINGS.noHelp}
        isDataEmpty={message.length == 0}
        emptyViewSubTitle=""
        renderItem={isLoading ? (renderItemLoading as any) : renderItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MessageCardsList;
