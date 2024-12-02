/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import VirtualList from "@/components/molecules/VirtualList/VirtualList";
import JobPostCard from "@/components/organism/JobPostCard/JobPostCard";
import React, { useCallback, useEffect, useState } from "react";
import { dateFormat, timeFormat } from "@/utility/utils";
import TabButton from "@/components/molecules/ButtonTypes/TabButton/TabButton";
import { useDemoData } from "@mui/x-data-grid-generator";
import JobPostCardLoading from "@/components/organism/JobPostCard/JobPostCardLoading";
import { STRINGS } from "@/constant/en";
import { Icons, Images } from "../../../../../../public/exporter";
import { getJobType } from "@/constant/constant";
import { IJobPost } from "@/api/fetures/Employee/EmployeeApi.types";

type ICompanyJobsListProps = {
  data: IJobPost[];
  isLoading: boolean;
  selectedPostId: number | null;
  onPressButton: (post: IJobPost) => void;
};

const CompanyJobsList: React.FC<ICompanyJobsListProps> = ({
  data,
  isLoading,
  selectedPostId,
  onPressButton,
}) => {
  const [jobs, setJobs] = useState<IJobPost[]>([]);
  const { data: demoData } = useDemoData({
    rowLength: 5,
    maxColumns: 9,
    dataSet: "Employee",
  });
  useEffect(() => {
    if (data) {
      setJobs(data);
    }
  }, [data]);

  const renderItemLoading = () => {
    return (
      <TabButton
        content={<JobPostCardLoading />}
        isSelected={false}
      ></TabButton>
    );
  };

  const renderItem = useCallback(
    (_: number, item: IJobPost) => {
      return (
        <TabButton
          key={item.id}
          content={
            <JobPostCard
              postByName={item.client_details.clientName || ""}
              profileName={item.job_name}
              days={item.eventDate ?? new Date()}
              image={item.client_details?.companylogo}
              textLabel={getJobType(item.job_type)}
              textStyle={"text-darkBlue bg-white"}
              iconWithTexts={[
                { text: `${item.id}`, icon: Icons.jobId },
                {
                  text: `${dateFormat(item?.eventDate ?? new Date())}`,
                  subText: `${timeFormat(
                    item.startShift ?? new Date()
                  )} - ${timeFormat(item.endShift ?? new Date())}`,
                  icon: Icons.time_Date,
                },
                { text: `${item.location}`, icon: Icons.location_Pin },
              ]}
            />
          }
          isSelected={selectedPostId === item.id}
          onPressButton={() => onPressButton(item)}
        />
      );
    },
    [selectedPostId, data]
  );

  return (
    <div className="h-full pb-4 w-full">
      <VirtualList
        data={isLoading ? demoData.rows : jobs}
        isLastPage={true}
        illustration={Images.noJobs}
        illustrationStyes="!w-40 !h-40"
        emptyViewTitle={STRINGS.noJobsCompleted}
        isDataEmpty={jobs.length == 0}
        emptyViewSubTitle=""
        renderItem={isLoading ? (renderItemLoading as any) : renderItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CompanyJobsList;
