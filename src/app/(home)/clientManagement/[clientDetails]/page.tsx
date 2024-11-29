/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  useChangeClientStatusMutation,
  useGetClientDetailsQuery,
  useLazyGetPostedJobByClientQuery,
} from "@/api/fetures/Client/ClientApi";
import Switch from "@/components/atoms/Switch/Switch";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import ContactDetailCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import { STRINGS } from "@/constant/en";
import { dateFormat, dateMonthFormat, timeFormat } from "@/utility/utils";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getClientStatusAttributesFromType } from "../types";
import { IClientStatus } from "@/constant/enums";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import JobDetails from "@/components/organism/JobDetails/JobDetails";
import JobPostCard from "@/components/organism/JobPostCard/JobPostCard";
import { getJobType } from "@/constant/constant";
import { Icons } from "../../../../../public/exporter";
import CustomList from "@/components/atoms/CustomList/CustomList";
import {
  IJobPostCustomizedResponse,
  IJobPostTypes,
} from "@/api/fetures/Company/Company.types";

const ClientDetails = ({ params }: { params: { clientDetails: string } }) => {
  const { data, refetch } = useGetClientDetailsQuery(params.clientDetails);
  const clientID = parseInt(params.clientDetails);
  const [status, setStatus] = useState<IClientStatus>();
  const [updateClientStatus] = useChangeClientStatusMutation();
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Set to false initially

  const [fetchJobPosts] = useLazyGetPostedJobByClientQuery();
  const [jobPosts, setJobPosts] = useState<IJobPostCustomizedResponse | null>(
    null
  );

  // Update status when data changes
  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data]);

  // Fetch client posted jobs when the page or scroll changes
  useEffect(() => {
    fetchJobPostHandler();
  }, [jobPosts]);

  const fetchJobPostHandler = async () => {
    try {
      const response = await fetchJobPosts({
        clientId: clientID,
        page: currentPage,
        perPage: 5,
      }).unwrap();
      console.log(response.data);
      if (response) {
        setJobPosts(response);
      }
    } catch (error) {
      setIsLoading(true);
      console.log("Error fetching job posts", error);
    }
  };
  const statusAttributes = status && getClientStatusAttributesFromType(status);

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    const newStatus = isChecked ? IClientStatus.ACTIVE : IClientStatus.INACTIVE;
    setStatus(newStatus); // Update state
    try {
      await updateClientStatus({
        status: newStatus,
        clientId: parseInt(params.clientDetails),
      });
      refetch();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Map the job data to CustomList items
  const mapJobData = (jobData) => {
    return jobData?.map((data: IJobPostTypes) => {
      return {
        children: (
          <JobPostCard
            companyName={data.client_details?.Name || ""}
            profileName={data.job_name}
            days={data.eventDate}
            image={data.client_details?.company_detail?.companylogo?.url}
            textLabel={getJobType(data.job_type)}
            textStyle={"text-darkBlue bg-white"}
            iconWithTexts={[
              { text: `${data.id}`, icon: Icons.jobId },
              {
                text: `${dateFormat(data.eventDate)}`,
                subText: `${timeFormat(data.startShift)} - ${timeFormat(
                  data.endShift
                )}`,
                icon: Icons.time_Date,
              },
              { text: `${data.location}`, icon: Icons.location_Pin },
            ]}
          />
        ),
        onClick: () => {
          setSelectedItem(<JobDetails data={data} />);
        },
      };
    });
  };

  const postedJob = mapJobData(jobPosts?.data);

  const tabsData = [
    {
      label: STRINGS.postJobs,
      content:
        postedJob && postedJob.length > 0 ? (
          <CustomList items={postedJob} isLoading={isLoading} />
        ) : (
          <CustomList
            noList={<div className="text-center">{STRINGS.noJobs}</div>}
          />
        ),
    },
  ];

  return (
    <>
      <div className="w-full h-[90%]">
        <PageSubHeader
          pageTitle={STRINGS.clientManagement}
          name={data?.name || ""}
        />
        <div className="flex gap-x-10 w-full h-[-webkit-fill-available] mt-2">
          {/* Left Side */}
          <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
            {!data ? (
              <>
                <Skeleton variant="circular" width={56} height={56} />
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                {/* Skeletons for Tabs */}
                <Skeleton variant="rectangular" width="100%" height={40} />
              </>
            ) : (
              <>
                <div className="flex justify-between h-fit mb-3">
                  <UserNameWithImage
                    name={data.name || ""}
                    containorStyle="!text-[16px] !leading-[20px]"
                    image={data.companyLogo}
                    imageStyle="!w-14 !h-14"
                    companyName={data.companyName || ""}
                    companyNameStyle="!text-[14px] !leading-[18px] !w-fit"
                    joinDate={dateMonthFormat(data.createdAt)}
                  />
                  <Switch
                    checked={status === "s1" ? true : false}
                    onChange={handleStatusChange}
                    label={statusAttributes?.text}
                    switchClassName={"justify-end !flex-col !w-fit"}
                    className={` -mt-[10px] text-[8px] leading-3 ${statusAttributes?.styles}`}
                  />
                </div>

                <ContactDetailCard
                  email={data.email || ""}
                  phoneNumber={data.contactNo || ""}
                  address={data.location || ""}
                  department={data.industry || ""}
                />
                <CustomTab
                  tabs={tabsData}
                  TabIndicatorProps={{
                    style: {
                      height: "3px",
                      borderTopRightRadius: "3px",
                      borderTopLeftRadius: "3px",
                    },
                  }}
                  sx={{
                    "&": { paddingX: "12px", paddingTop: "4px" },
                    ".MuiButtonBase-root": {
                      fontSize: "16px",
                      lineHeight: "20px",
                      textTransform: "none",
                    },
                    ".MuiTabs-flexContainer": { gap: "10px" },
                    ".Mui-selected": { fontWeight: "bold" },
                  }}
                />
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
            {selectedItem ? (
              selectedItem
            ) : jobPosts && jobPosts.data ? (
              <JobDetails data={jobPosts.data[0]} />
            ) : (
              <Skeleton variant="rectangular" width="100%" height={500} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
