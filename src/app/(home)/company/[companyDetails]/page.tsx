/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  ICompanyClientResponse,
  ICompanyDetails,
  IGetCompanyClientResponse,
  IJobPostCustomizedResponse,
} from "@/api/fetures/Company/Company.types";
import {
  useLazyGetClosedJobsQuery,
  useLazyGetCompanyClientDetailsQuery,
  useLazyGetCompanyDetailsQuery,
  useLazyGetPostedJobQuery,
} from "@/api/fetures/Company/CompanyApi";
import CustomList from "@/components/atoms/CustomList/CustomList";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import ContactCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import TextGroup from "@/components/organism/TextGroup/TextGroup";
import WorkHistoryCard from "@/components/organism/WorkHistoryCard/WorkHistoryCard";
import { STRINGS } from "@/constant/en";
import React, { useEffect, useState } from "react";
import { Icons } from "../../../../../public/exporter";
import { dateFormat, timeFormat } from "@/utility/utils";
import JobDetails from "@/components/organism/JobDetails/JobDetails";
import { getJobType } from "@/constant/constant";
import Skeleton from "@mui/material/Skeleton"; // Importing Skeleton component
import CompanyClientDetails from "@/components/organism/CompanyClientDetails/CompanyClientDetails";

const CompanyDetails = ({ params }: { params: { companyDetails: string } }) => {
  const [fetchOpenJobs, { error }] = useLazyGetPostedJobQuery();
  const [fetchClosedJobs] = useLazyGetClosedJobsQuery();
  const [fetchCompanyDetails] = useLazyGetCompanyDetailsQuery();
  const [fetchCompanyClients] = useLazyGetCompanyClientDetailsQuery();
  const [openJob, setOpenJob] = useState<IJobPostCustomizedResponse | null>(
    null
  );
  const [closedJob, setClosedJob] = useState<IJobPostCustomizedResponse | null>(
    null
  );
  const [companyData, setCompanyData] = useState<ICompanyDetails | null>(null);
  const [clientDetails, setClientDetials] =
    useState<IGetCompanyClientResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(null);

  const getCompanyDetails = async () => {
    const response = await fetchCompanyDetails(params.companyDetails).unwrap();
    if (response) {
      setCompanyData(response);
    } else {
      console.log("Company details not available", error);
      setCompanyData(null);
    }
  };

  const getCompanyClients = async () => {
    const response = await fetchCompanyClients(params.companyDetails).unwrap();
    console.log(response);
    if (response) {
      setClientDetials(response);
    } else {
      console.log("Company clients not available", error);
      setClientDetials(null);
    }
  };

  const getOpenJobs = async () => {
    const response = await fetchOpenJobs(params.companyDetails).unwrap();
    if (response && response.data) {
      setOpenJob(response);
    } else {
      console.log("Open jobs not available", error);
      setOpenJob(null);
    }
  };

  const getClosedJob = async () => {
    const response = await fetchClosedJobs(params.companyDetails).unwrap();
    if (response && response.data) {
      setClosedJob(response);
    } else {
      console.log("Closed jobs not available", error);
      setClosedJob(null);
    }
  };

  useEffect(() => {
    if (params.companyDetails) {
      getCompanyDetails();
      getCompanyClients();
      getOpenJobs();
      getClosedJob();
    }
  }, [params.companyDetails]);

  // Map the job data to CustomList items
  const mapJobData = (jobData) => {
    return jobData?.map((data) => {
      return {
        children: (
          <WorkHistoryCard
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

  const openJobData = mapJobData(openJob?.data);
  const closedJobData = mapJobData(closedJob?.data);
  const allClients = clientDetails?.map((client) => {
    return {
      children: (
        <UserNameWithImage name={client.Name ?? ""} image={companyData?.companylogo} />
      ),
      onClick: () => {
        setSelectedItem(<CompanyClientDetails data={client} image={companyData?.companylogo} />);
      }
    };
  });

  // Tabs Data
  const tabsData = [
    {
      label: STRINGS.allClient,
      content: (
        <CustomList
          items={allClients}
          noList={<div className="text-center">{STRINGS.noClient}</div>}
        />
      ),
    },
    {
      label: STRINGS.openJob,
      content: openJobData ? (
        <CustomList items={openJobData} />
      ) : (
        <CustomList
          noList={<div className="text-center">{STRINGS.noOpenJob}</div>}
        />
      ),
      onClickAction: () => {
        setSelectedItem(openJobData.length > 0 ? openJobData[0].onClick : null); // Select first job
      },
    },
    {
      label: STRINGS.closeJob,
      content: closedJobData ? (
        <CustomList items={closedJobData} />
      ) : (
        <CustomList
          noList={<div className="text-center">{STRINGS.noClosedJob}</div>}
        />
      ),
      onClickAction: () => {
        setSelectedItem(
          closedJobData.length > 0 ? closedJobData[0].onClick : null
        ); // Select first job
      },
    },
  ];

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        pageTitle={STRINGS.company}
        name={companyData?.companyname || ""}
      />
      <div className="flex gap-x-10 w-full h-[-webkit-fill-available] mt-2">
        {/* Left Side */}
        <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
          {/* Skeletons for Company Info */}
          {!companyData ? (
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
              <UserNameWithImage
                name={companyData?.companyname || ""}
                image={companyData?.companylogo}
                imageStyle="!w-14 !h-14"
                nameStyle="!text-[24px] !leading-[28px]"
              />
              <div className="w-full h-3" />
              <ContactCard
                email={companyData?.companyemail || ""}
                phoneNumber={companyData?.contactno || ""}
                address={companyData?.address || ""}
                link={companyData?.Website || ""}
              />
              <div className="flex gap-x-[13px] border border-borderGrey rounded-lg p-3 text-[16px] leading-[20px] mt-3 w-full">
                <TextGroup
                  title={STRINGS.coRegisteredNumber}
                  text={companyData?.regNo || ""}
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
                  text={companyData?.gstNo || ""}
                  textgroupStyle="flex flex-col gap-y-1"
                />
              </div>
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
          ) : (
            <Skeleton variant="rectangular" width="100%" height={400} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
