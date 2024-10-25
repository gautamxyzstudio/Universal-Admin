"use client";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import { STRINGS } from "@/constant/en";
import React, { useState } from "react";
import { Icons, Images } from "../../../../../public/exporter";
import ContactCard from "@/components/organism/ContactCard/ContactCard";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import CustomList from "@/components/atoms/CustomList/CustomList";
import TextGroup from "@/components/organism/TextGroup/TextGroup";
import DocumentCard from "@/components/organism/DocumentCard/DocumentCard";
import WorkHistortyCard from "@/components/organism/WorkHistoryCard/WorkHistortyCard";
import WorkDetails from "@/components/organism/WorkDetails/WorkDetails";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";

const EmployeeDetails = ({
  params,
}: {
  params: { employeeDetails: string };
}) => {
  console.log(params);
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(
    "All requested Document"
  );

  // Bank Content
  const bankData = [
    {
      label: "Bank Details",
      onClick: () => {
        console.log("Bank Details");
      },
    },
  ];

  // Profile Content
  const profileData = [
    {
      label: "History",
      onClick: () => {
        setSelectedItem("Profile History Content");
      },
    },
  ];

  // Document Content
  const itemsData = [
    {
      label: "All requested Document",
      icon: Icons.doc,
      status: "Approved",
      onClick: () => {
        setSelectedItem("All requested Document Content");
      },
    },
    {
      label: "Sin Document",
      icon: Icons.doc,
      status: "Pending",
      onClick: () => {
        setSelectedItem("Sin Document Content");
      },
    },
    {
      label: "Govt. IDs",
      icon: Icons.doc,
      status: "Pending",
      onClick: () => {
        setSelectedItem("Govt. IDs Content");
      },
    },
    {
      label: "Document (PR card, Permit)",
      icon: Icons.doc,
      status: "Pending",
      onClick: () => {
        setSelectedItem("Document (PR card, Permit) Content");
      },
    },
    {
      label: "Licences/certifications",
      icon: Icons.doc,
      status: "Pending",
      onClick: () => {
        setSelectedItem(<h2>Licences/certifications Content</h2>);
      },
    },
  ];

  // Work History Contents
  const workHistoryData = [
    {
      children: (
        <WorkHistortyCard
          companyName={"Cosmic Security"}
          profileName={"Security Guard"}
          image={Images.demoImg}
          textLabel={STRINGS.applied}
          textStyle={"text-darkBlue bg-white"}
          iconWithTexts={[
            { text: "20 /hr", icon: Icons.dollar },
            { text: "2-06-2024", icon: Icons.timeDate },
            {
              text: "IPEX Oakville, 1425 North Service",
              icon: Icons.locationPin,
            },
          ]}
        />
      ),
      onClick: () => {
        console.log("Clicked on Work card 1");
        setSelectedItem(<WorkDetails />);
      },
    },
    {
      children: (
        <WorkHistortyCard
          companyName={"Cosmic Security"}
          profileName={"Security Guard"}
          image={Images.demoImg}
          textLabel={STRINGS.completed}
          textStyle={"text-skyBlue bg-lightSkyBlue"}
          iconWithTexts={[
            { text: "20 /hr", icon: Icons.dollar },
            { text: "2-06-2024", icon: Icons.timeDate },
            {
              text: "IPEX Oakville, 1425 North Service",
              icon: Icons.locationPin,
            },
          ]}
        />
      ),
      onClick: () => {
        console.log("Clicked on Work card 2");
        setSelectedItem(<WorkDetails />);
      },
    },
    {
      children: (
        <WorkHistortyCard
          companyName={"Cosmic Security"}
          profileName={"Security Guard"}
          image={Images.demoImg}
          textLabel={STRINGS.completed}
          textStyle={"text-skyBlue bg-lightSkyBlue"}
          iconWithTexts={[
            { text: "20 /hr", icon: Icons.dollar },
            { text: "2-06-2024", icon: Icons.timeDate },
            {
              text: "IPEX Oakville, 1425 North Service",
              icon: Icons.locationPin,
            },
          ]}
        />
      ),
      onClick: () => {
        console.log("Clicked on Work card 3");
        setSelectedItem(<WorkDetails />);
      },
    },
  ];
  const DocumentContent = () => {
    return (
      <div>
        <h2>All Request Document </h2>
      </div>
    );
  };

  const BankDetails = () => {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        <TextGroup
          textgroupStyle="flex flex-col gap-y-1"
          title={"Bank account number"}
          subTitle={"873957737549"}
        />
        <TextGroup
          textgroupStyle="flex flex-col gap-y-1"
          title={"Institution number"}
          subTitle={"3647838"}
        />
        <TextGroup
          textgroupStyle="flex flex-col gap-y-1"
          title={"Branch code"}
          subTitle={"3647838"}
        />
        <DocumentCard
          label="Direct deposit/void cheque"
          docImageSrc={Images.demoImg}
          docImageName={"imageName.jpg"}
          fileStyle="bg-lightPrimary"
        />
      </div>
    );
  };
  const ProfileDetails = () => {
    return (
      <div>
        <h2>Profile Details Content</h2>
      </div>
    );
  };

  const tabsData = [
    {
      label: "Document",
      content: <CustomList items={itemsData} />,
      onClickAction: () => {
        console.log("Document Content");
        setSelectedItem(<DocumentContent />);
      },
    },
    {
      label: "Bank",
      content: <CustomList items={bankData} />,
      onClickAction: () => {
        console.log("Bank Content");
        setSelectedItem(<BankDetails />);
      },
    },
    {
      label: "Profile",
      content: <CustomList items={profileData} />,
      onClickAction: () => {
        console.log("Profile Content");
        setSelectedItem(<ProfileDetails />);
      },
    },
    {
      label: "Work history",
      content: <CustomList items={workHistoryData} />,
      onClickAction: () => {
        console.log("Work Content");
        setSelectedItem(<WorkDetails />);
      },
    },
  ];

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader pageTitle={STRINGS.employeeManagement} name="Jhon" />
      {/* Left Side */}
      <div className="flex gap-x-10 w-full h-[-webkit-fill-available] mt-2">
        <div className="flex flex-col w-[36.4%]">
          <UserNameWithImage
            name={"Ashwani Kaur"}
            image={Images.demoImg}
            imageStyle="!w-14 !h-14"
            joinDate="30 may, 2024"
          />
          <div className="inline-flex border border-borderGrey rounded-lg p-3 gap-x-[69px] text-[16px] leading-[20px] mt-6">
            <TextGroup
              textgroupStyle="flex flex-col gap-y-1"
              title="Date"
              subTitle="04/08/2000"
            />
            <TextGroup
              textgroupStyle="flex flex-col gap-y-1"
              title="Gender"
              subTitle="Female"
            />
            <TextGroup
              textgroupStyle="flex flex-col gap-y-1"
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
        {/* Right Side */}
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
          {selectedItem}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
