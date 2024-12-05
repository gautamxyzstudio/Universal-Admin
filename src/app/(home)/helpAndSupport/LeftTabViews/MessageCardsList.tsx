/* eslint-disable @typescript-eslint/no-explicit-any */
import VirtualList from "@/components/molecules/VirtualList/VirtualList";
import React, { useCallback, useEffect, useState } from "react";
import TabButton from "@/components/molecules/ButtonTypes/TabButton/TabButton";
import { useDemoData } from "@mui/x-data-grid-generator";
import { STRINGS } from "@/constant/en";

import { Skeleton } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import MessageCard from "@/components/organism/MessageCard/MessageCard";
import { Images } from "../../../../../public/exporter";
import { IIssueRaisedByEmployee } from "@/api/fetures/HelpIssue/HelpIssueApi.types";
type IMessageCardsListProps = {
  data: IIssueRaisedByEmployee[];
  isLoading: boolean;
  selectedIssueId: number | null | string;
  // image: StaticImport | string | null;
  onPressButton: (post: IIssueRaisedByEmployee) => void;
};

const MessageCardsList: React.FC<IMessageCardsListProps> = ({
  data,
  isLoading,
  selectedIssueId,
  onPressButton,
}) => {
  const [message, setMessage] = useState<IIssueRaisedByEmployee[]>([]);
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
          <>
            <Skeleton variant="circular" width={56} height={56} />
            <Skeleton variant="text" width="80%" height={40} />
          </>
        }
        isSelected={false}
      ></TabButton>
    );
  };

  const renderItem = useCallback(
    (_: number, item: IIssueRaisedByEmployee) => {
      return (
        <TabButton
          key={item.id}
          content={
            <MessageCard
              isClient={false}
              companyName={""}
              profileName={item.employeeName ?? ""}
              issueId={item.id}
              issuePublish={item.publishedAt}
              message={item.issue ?? ""}
              image={null}
              textLabel={item.issueStatus}
            />
          }
          isSelected={selectedIssueId === item.id}
          onPressButton={() => onPressButton(item)}
        />
      );
    },
    [selectedIssueId, data]
  );
  return (
    <div className="h-full pb-4 w-full">
      <VirtualList
        data={isLoading ? demoData.rows : message}
        isLastPage={true}
        illustration={Images.noHelpSupport}
        illustrationStyes="!w-40 !h-40"
        emptyViewTitle={STRINGS.noJobsCompleted}
        isDataEmpty={message.length == 0}
        emptyViewSubTitle=""
        renderItem={isLoading ? (renderItemLoading as any) : renderItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MessageCardsList;
