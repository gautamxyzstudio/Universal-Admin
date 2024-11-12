/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { IJobPostCustomizedResponse } from "@/api/fetures/Company/Company.types";
import {
  useLazyGetClosedJobsQuery,
  useLazyGetPostedJobQuery,
} from "@/api/fetures/Company/CompanyApi";
import CustomList from "@/components/atoms/CustomList/CustomList";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import ContactCard from "@/components/organism/ContactCard/ContactCard";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import TextGroup from "@/components/organism/TextGroup/TextGroup";
import WorkHistoryCard from "@/components/organism/WorkHistoryCard/WorkHistoryCard";
import { STRINGS } from "@/constant/en";
import React, { useEffect, useState } from "react";
import { Icons } from "../../../../../public/exporter";
import { dateFormat, timeFormat } from "@/utility/utils";
import JobDetails from "@/components/organism/JobDetails/JobDetails";
import { useGetCompanyDetailsContext } from "@/contexts/CompanyDetailsContext/CompanyDetailsContext";
import { getJobType } from "@/constant/constant";
// import { getUserDetailsFromCookies } from "@/utility/cookies";

const CompanyDetails = ({ params }: { params: { companyDetails: string } }) => {
  // console.log(getUserDetailsFromCookies());
  console.log(params);
  const [fetchOpenJobs, { error }] = useLazyGetPostedJobQuery();
  const [fetchClosedJobs] = useLazyGetClosedJobsQuery();
  const [openJob, setOpenJob] = useState<IJobPostCustomizedResponse | null>(
    null
  );
  const [closedJob, setClosedJob] = useState<IJobPostCustomizedResponse | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(
    "All requested Document"
  );
  const { companyDetail } = useGetCompanyDetailsContext();
  const getOpenJobs = async () => {
    const response = await fetchOpenJobs(params.companyDetails).unwrap();
    if (response && response.data) {
      setOpenJob(response);
    } else {
      console.log("Fetch open jobs failed", error);
      setOpenJob(null);
    }
  };

  const getClosedJob = async () => {
    const response = await fetchClosedJobs(params.companyDetails).unwrap();
    if (response && response.data) {
      setClosedJob(response);
    } else {
      console.log("Fetch closed jobs failed", error);
      setClosedJob(null);
    }
  };
  useEffect(() => {
    if (params.companyDetails) {
      // Fetch open jobs for the company here, if needed. You can add it in useEffect hook or in a separate function.
      getOpenJobs();
      // Fetch closed jobs for the company here, if needed. You can add it in useEffect hook or in a separate function.
      getClosedJob();
    }
  }, [params.companyDetails]);

  const mapJobData = (jobData: any[]) => {
    return jobData?.map((data) => {
      return {
        children: (
          <WorkHistoryCard
            companyName={data?.client_details?.Name || ""}
            profileName={data.job_name}
            days={data.eventDate}
            image={data.client_details?.company_detail?.companylogo?.url}
            textLabel={getJobType(data.job_type)}
            textStyle={"text-darkBlue bg-white"}
            iconWithTexts={[
              {
                text: `${data.id}`,
                icon: Icons.jobId,
                textStyle: "",
              },
              {
                text: `${dateFormat(data.eventDate)}`,
                subText: `${timeFormat(data.startShift)} - ${timeFormat(
                  data.endShift
                )}`,
                icon: Icons.time_Date,
                textStyle: "",
              },
              {
                text: `${data.location}`,
                icon: Icons.location_Pin,
                textStyle: "",
              },
            ]}
          />
        ),
        onClick: () => {
          console.log("Clicked on Work card", data.id);
          setSelectedItem(<JobDetails data={data} />);
        },
      };
    });
  };

  const openJobData = mapJobData(openJob?.data || []);
  const closedJobData = mapJobData(closedJob?.data || []);

  const tabsData = [
    {
      label: STRINGS.allClient,
    },
    {
      label: STRINGS.openJob,
      content: openJobData ? (
        <CustomList items={openJobData} />
      ) : (
        <CustomList items={[]} />
      ),
    },
    {
      label: STRINGS.closeJob,
      content: closedJobData ? (
        <CustomList items={closedJobData} />
      ) : (
        <CustomList items={[]} />
      ),
    },
  ];

  // const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {
  //   const tabContent = tabsData[newTabIndex]?.content;
  //   if (tabContent) {
  //     const items = tabContent.props.items || [];
  //     if (items.length > 0) {
  //       setSelectedItem(items[0].children); // Set the first item's children as the selectedItem
  //     }
  //   }
  // };
  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        pageTitle={STRINGS.company}
        name={companyDetail?.companyname || ""}
      />
      <div className="flex gap-x-10 w-full h-[-webkit-fill-available] mt-2">
        {/* Left Side */}
        <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
          <UserNameWithImage
            name={companyDetail?.companyname || ""}
            image={companyDetail?.companylogo}
            imageStyle="!w-14 !h-14"
            nameStyle="!text-[24px] !leading-[28px]"
          />
          <div className="w-full h-3" />
          <ContactCard
            email={companyDetail?.companyemail || ""}
            phoneNumber={companyDetail?.contactno || ""}
            address={companyDetail?.address || ""}
            link={companyDetail?.Website || ""}
          />

          <div className="flex gap-x-[13px] border border-borderGrey rounded-lg p-3 text-[16px] leading-[20px] mt-3 w-full">
            <TextGroup
              title={STRINGS.coRegisteredNumber}
              text={companyDetail?.regNo || ""}
              textgroupStyle="flex flex-col gap-y-1"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="52"
              viewBox="0 0 2 52"
              fill="none"
            >
              <path d="M1 1V51" stroke="#DBDBDB" stroke-linecap="round" />
            </svg>
            <TextGroup
              title={STRINGS.gstHSTNumber}
              text={companyDetail?.gstNo || ""}
              textgroupStyle="flex flex-col gap-y-1"
            />
          </div>
          <CustomTab
            tabs={tabsData}
            // onTabChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                height: "3px",
                borderTopRightRadius: "3px",
                borderTopLeftRadius: "3px",
              },
            }}
            sx={{
              "&": {
                paddingX: "12px",
                paddingTop: "4px",
              },
              ".MuiButtonBase-root": {
                fontSize: "16px",
                lineHeight: "20px",
                textTransform: "none",
              },
              ".MuiTabs-flexContainer": {
                gap: "10px",
              },
              ".Mui-selected": {
                fontWeight: "bold",
              },
            }}
          />
        </div>
        {/* Right Side */}
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
          {selectedItem}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
