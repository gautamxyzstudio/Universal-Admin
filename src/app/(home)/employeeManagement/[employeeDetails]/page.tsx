"use client";
import ProfileCard from "@/components/organism/ProfileCard/ProfileCard";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import { STRINGS } from "@/constant/en";
import React, { useState } from "react";
import { Icons, Images } from "../../../../../public/exporter";
import ContactCard from "@/components/organism/ContactCard/ContactCard";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import CustomList from "@/components/atoms/CustomList/CustomList";
import TextGroup from "@/components/organism/TextGroup/TextGroup";

const EmployeeDetails = ({
  params,
}: {
  params: { employeeDetails: string };
}) => {
  console.log(params);
  console.log("employeeDetails");
  const [selectedItem, setSelectedItem] = useState<string>("");

  const BankContent = () => {
    const bankData = [
      {
        label: "Bank Details",
        onClickAction: () => {
          console.log("Bank Details");
          setSelectedItem("Bank Details Content");
        },
      },
    ];
    return <CustomList items={bankData} />;
  };
  const ProfileContent = () => {
    const profileData = [
      {
        label: "History",
        onClickAction: () => {
          setSelectedItem("Profile History Content");
        },
      },
    ];
    return <CustomList items={profileData} />;
  };

  const itemsData = [
    {
      label: "All requested Document",
      icon: Icons.doc,
      status: "Approved",
      onClickAction: () => {
        setSelectedItem("All requested Document Content");
      },
    },
    {
      label: "Sin Document",
      icon: Icons.doc,
      status: "Pending",
      onClickAction: () => {
        setSelectedItem("Sin Document Content");
      },
    },
    {
      label: "Govt. IDs",
      icon: Icons.doc,
      status: "Pending",
      onClickAction: () => {
        setSelectedItem("Document (PR card, Permit) Content");
      },
    },
    {
      label: "Document (PR card, Permit)",
      icon: Icons.doc,
      status: "Pending",
      onClickAction: () => {
        setSelectedItem("Licences/certifications Content");
      },
    },
    {
      label: "Licences/certifications",
      icon: Icons.doc,
      status: "Pending",
      onClickAction: () => {
        setSelectedItem("Licences/certifications Content");
      },
    },
  ];
  const DocumentContent = () => {
    return <CustomList items={itemsData} />;
  };

  const tabsData = [
    { label: "Document", content: <DocumentContent /> },
    { label: "Bank", content: <BankContent /> },
    { label: "Profile", content: <ProfileContent /> },
    { label: "Work history", content: <div>Work History Content</div> },
  ];

  return (
    <>
      <PageSubHeader pageTitle={STRINGS.employeeManagement} name="Jhon" />
      <div className="flex gap-x-10 w-full h-screen mt-2">
        <div className="flex flex-col w-[36.4%]">
          <ProfileCard
            profileName="Ashwani Kaur"
            joinDate="30 may, 2024"
            imageSrc={Images.demoImg}
          />
          <div className="inline-flex border border-borderGrey rounded-lg p-3 gap-x-[69px] text-[16px] leading-[20px] mt-6">
            <TextGroup
              divStyle="flex flex-col gap-y-1"
              title="Date"
              subTitle="04/08/2000"
            />
            <TextGroup
              divStyle="flex flex-col gap-y-1"
              title="Gender"
              subTitle="Female"
            />
            <TextGroup
              divStyle="flex flex-col gap-y-1"
              title="Work status"
              subTitle={STRINGS.fullTime}
            />
          </div>
          <ContactCard
            email="ashwanikaur08@gmail.com"
            phoneNumber="+91-98980989980"
            address="IPEX Oakville, 1425 North Service"
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
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 pt-6 pl-6">
          {selectedItem ? selectedItem : "onClickAction data show here"}
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
