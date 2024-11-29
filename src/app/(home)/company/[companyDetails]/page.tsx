/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  ICompanyDetails,
  IGetCompanyClientResponse,
  IJobPostCustomizedResponse,
  IJobPostTypes,
  IJobPostTypes,
} from "@/api/fetures/Company/Company.types";
import {
  useGetCompanyDetailsQuery,
  useLazyGetClosedJobsQuery,
  useLazyGetCompanyClientDetailsQuery,
  useLazyGetPostedJobQuery,
} from "@/api/fetures/Company/CompanyApi";
import CustomList from "@/components/atoms/CustomList/CustomList";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import TextGroup from "@/components/organism/TextGroup/TextGroup";
import JobPostCard from "@/components/organism/JobPostCard/JobPostCard";
import { STRINGS } from "@/constant/en";
import React, { useEffect, useState } from "react";
import { Icons } from "../../../../../public/exporter";
import { dateFormat, timeFormat } from "@/utility/utils";
import JobDetails from "@/components/organism/JobDetails/JobDetails";
import { getJobType } from "@/constant/constant";
import Skeleton from "@mui/material/Skeleton"; // Importing Skeleton component
import CompanyClientDetails from "@/components/organism/CompanyClientDetails/CompanyClientDetails";
import ContactDetailCard from "@/components/organism/ContactDetailCard/ContactDetailCard";
import { ITextGroupTypes } from "@/components/organism/TextGroup/TextGroup.types";
import { SxProps } from "@mui/material";
import { Theme } from "@emotion/react";
import CompanyJobsList from "./CompanyJobsPostList";

const CompanyDetails = ({ params }: { params: { companyDetails: string } }) => {
  const { data, isFetching } = useGetCompanyDetailsQuery(params.companyDetails);
  const [fetchCompanyClients, { error }] =
    useLazyGetCompanyClientDetailsQuery();
  const [companyData, setCompanyData] = useState<ICompanyDetails | null>(null);

  // Open Job
  const [fetchOpenJobs, { isFetching: fetchOpenJobLoading }] =
    useLazyGetPostedJobQuery();
  const [openJob, setOpenJob] = useState<IJobPostTypes[]>([]);
  const [selectedOpenJob, setSelectedOpenJob] = useState<IJobPostTypes | null>(
    null
  );

  // Closed Job
  const [fetchClosedJobs, { isFetching: fetchClosedJobLoading }] =
    useLazyGetClosedJobsQuery();
  const [closedJob, setClosedJob] = useState<IJobPostTypes[]>([]);
  const [selectedClosedJob, setSelectedClosedJob] =
    useState<IJobPostTypes | null>(null);

  // Client Details
  const [clientDetails, setClientDetails] =
    useState<IGetCompanyClientResponse | null>(null);

  // Tab Selection
  const [selectedTabItemIndex, setSelectedTabItemIndex] = useState(0);

  useEffect(() => {
    if (data) {
      setCompanyData(data);
    }
  });

  //Company Client Information
  const getCompanyClients = async () => {
    const response = await fetchCompanyClients(params.companyDetails).unwrap();
    console.log(response);
    if (response) {
      setClientDetails(response);
    } else {
      console.log("Company clients not available", error);
      setClientDetails(null);
    }
  };

  // open job details
  const getOpenJob = async (id: number) => {
    try {
      const response = await fetchOpenJobs(id).unwrap();
      if (response.data) {
        setOpenJob(response.data);
        setSelectedOpenJob(response.data[0]);
      }
    } catch (error) {
      console.log("Error in fetching open Job", error);
    }
  };

  // closed job details
  const getClosedJob = async (id: number) => {
    try {
      const response = await fetchClosedJobs(id).unwrap();
      if (response.data) {
        setClosedJob(response.data);
        setSelectedClosedJob(response.data[0]);
      }
    } catch (error) {
      console.log("Error in fetching open Job", error);
    }
  };

  // UseEffect to load the data
  useEffect(() => {
    if (params.companyDetails && selectedTabItemIndex === 1) {
      getOpenJob(parseInt(params.companyDetails));
    }
  }, [selectedTabItemIndex === 1]);

  useEffect(() => {
    if (params.companyDetails && selectedTabItemIndex === 2) {
      getClosedJob(parseInt(params.companyDetails));
    }
  }, [selectedTabItemIndex === 2]);

  // Tabs Data
  const tabsData = [
    {
      label: STRINGS.allClient,
      onClickAction: () => setSelectedTabItemIndex(0),
    },
    {
      label: STRINGS.openJob,
      onClickAction: () => setSelectedTabItemIndex(1),
    },
    {
      label: STRINGS.closeJob,
      onClickAction: () => setSelectedTabItemIndex(2),
    },
  ];
  useEffect(() => {
    if (params.companyDetails) {
      getCompanyClients();
    }
  }, [params.companyDetails]);

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        isLoading={isFetching}
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
                image={companyData?.companylogo ?? ""}
                imageStyle="!w-14 !h-14"
                nameStyle="!text-[24px] !leading-[28px]"
              />
              <div className="w-full h-3" />
              <ContactDetailCard
                email={companyData?.companyemail || ""}
                phoneNumber={companyData?.contactno || ""}
                address={companyData?.address || ""}
                link={companyData?.Website || ""}
              />
              <div className="flex gap-x-[13px] border border-borderGrey rounded-lg p-3 text-[16px] leading-[20px] mt-3 w-full">
                <TextGroup
                  title={STRINGS.coRegisteredNumber}
                  text={companyData?.regNo || ""}
                  type={ITextGroupTypes.detailPage}
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
                  type={ITextGroupTypes.detailPage}
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
                sx={styles}
              />
            </>
          )}

          <div className="bg-white border pt-4 border-borderGrey rounded-b-lg h-full w-full">
            {selectedTabItemIndex === 0 && <div>All client</div>}
            {selectedTabItemIndex === 1 && (
              <CompanyJobsList
                data={openJob}
                isLoading={fetchOpenJobLoading}
                selectedPostId={selectedOpenJob?.id ?? null}
                onPressButton={(jobPost)=>setSelectedOpenJob(jobPost)}
              />
            )}
            {selectedTabItemIndex === 2 && (
              <CompanyJobsList
                data={closedJob}
                isLoading={fetchClosedJobLoading}
                selectedPostId={selectedClosedJob?.id ?? null}
                onPressButton={(jobPost)=>setSelectedClosedJob(jobPost)}
              />
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
          {selectedTabItemIndex === 1 && (
            <div className="w-full mb-5 h-full">
            {selectedOpenJob && (
              <JobDetails data={selectedOpenJob} isEmployee={false} />
            )}
          </div>
          )
          }
          {selectedTabItemIndex === 2 && (
            <div className="w-full mb-5 h-full">
            {selectedOpenJob && (
              <JobDetails data={selectedClosedJob} isEmployee={false} />
            )}
          </div>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;

const styles: SxProps<Theme> = {
  "&": { paddingX: "12px", paddingTop: "4px" },
  ".MuiButtonBase-root": {
    fontSize: "16px",
    lineHeight: "20px",
    textTransform: "none",
  },
  ".MuiTabs-flexContainer": { gap: "10px" },
  ".Mui-selected": { fontWeight: "bold" },
};
