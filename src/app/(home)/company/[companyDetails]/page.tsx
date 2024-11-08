/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  ICompany,
  IJobPostCustomizedResponse,
} from "@/api/fetures/Company/Company.types";
import {
  useLazyGetCompanyQuery,
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
import { dateFormat, TimeFormat } from "@/utility/utils";
import JobDetails from "@/components/organism/JobDetails/JobDetails";

const CompanyDetails = ({ params }: { params: { companyDetails: string } }) => {
  const [fetchCompanies, { error }] = useLazyGetCompanyQuery();
  const [companyData, setCompanyData] = useState<ICompany | null>(null);
  const [fetchOpenJobs] = useLazyGetPostedJobQuery();
  const [openJob, setOpenJob] = useState<IJobPostCustomizedResponse | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(
    "All requested Document"
  );

  const fetchData = async () => {
    const response = await fetchCompanies({
      page: 1,
      search: "",
    }).unwrap();
    if (response && response.data) {
      const filteredCompanyData = response.data.find(
        (companyData: ICompany) =>
          companyData.id.toString() === params.companyDetails
      );
      console.log(filteredCompanyData);
      if (filteredCompanyData) {
        setCompanyData(filteredCompanyData);
      } else {
        console.log("Company data not found", error);
        setCompanyData(null);
      }
    }
  };
  const fetchJobs = async () => {
    const response = await fetchOpenJobs(params.companyDetails).unwrap();
    if (response && response.data) {
      console.log(response.data, "success");
      setOpenJob(response);
    } else {
      console.log("Fetch open jobs failed", error);
      setOpenJob(null);
    }
  };
  useEffect(() => {
    if (params.companyDetails) {
      fetchData();
      // Fetch open jobs for the company here, if needed. You can add it in useEffect hook or in a separate function.
      fetchJobs();
    }
  }, [params.companyDetails]);

  const openJobData = openJob?.data?.map((data) => {
    return {
      children: (
        <WorkHistoryCard
          companyName={data.client_details?.Name || ""}
          profileName={data.job_name}
          days={data.eventDate}
          image={data.client_details?.company_detail?.companylogo?.url}
          textLabel={data.job_type}
          textStyle={"text-darkBlue bg-white"}
          iconWithTexts={[
            {
              text: `${data.id}`,
              icon: Icons.jobId,
              textStyle: "",
            },
            {
              text: `${dateFormat(data.eventDate)}`,
              subText: `${TimeFormat(data.startShift)} - ${TimeFormat(
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
        setSelectedItem(<JobDetails />);
      },
    };
  });

  const tabsData = [
    {
      label: STRINGS.allClient,
    },
    {
      label: STRINGS.openJob,
      content: <CustomList items={openJobData} />,
    },
    {
      label: STRINGS.closeJob,
      // content : <CustomList items={}/>
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
        <div className="flex flex-col w-[36.4%]">
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
              subTitle={companyData?.regNo || ""}
              textgroupStyle="flex flex-col gap-y-1"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="52"
              viewBox="0 0 2 52"
              fill="none"
            >
              <path d="M1 0V52" stroke="#EBEBEB" />
            </svg>
            <TextGroup
              title={STRINGS.gstHSTNumber}
              subTitle={companyData?.gstNo || ""}
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
