import ProfileCard from "@/components/organism/ProfileCard/ProfileCard";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import { STRINGS } from "@/constant/en";
import React from "react";
import { Images } from "../../../../../public/exporter";
import ContactCard from "@/components/organism/ContactCard/ContactCard";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import CustomButton from "@/components/atoms/CutomButton/CustomButton";
// import { TabPanel } from "@mui/lab";

const EmployeeDetails = ({
  params,
}: {
  params: { employeeDetails: string };
}) => {
  console.log(params);
  const BankContent = () => {
    return (
      <CustomButton
     variant="outlined"
     fullWidth
        title={"Bank Details"}
        onClick={undefined}
        buttonType={"outline-primary"}
      />
    );
  };
  const ProfileContent = () => {
    return (
      <CustomButton
     variant="outlined"
     fullWidth
        title={"History"}
        onClick={undefined}
        buttonType={"outline-primary"}
      />
    );
  };

  const tabsData = [
    { label: "Document", content: <div>Document Content</div> },
    { label: "Bank", content: <BankContent /> },
    { label: "Profile", content: <ProfileContent/> },
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
            <div className="flex flex-col gap-y-1">
              <span className="text-disable">Date of birth</span>
              <span className="text-Black">04/08/2000</span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-disable">Gender</span>
              <span className="text-Black">Male</span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-disable">Work status</span>
              <span className="text-Black">{STRINGS.fullTime}</span>
            </div>
          </div>
          <ContactCard
            email="ashwanikaur08@gmail.com"
            phoneNumber="+91-98980989980"
            address="IPEX Oakville, 1425 North Service"
          />
          <CustomTab tabs={tabsData} />
        </div>
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 pt-6 pl-6">
          <h2 className="text-[24px] leading-[28px] text-Black">
            All requested document
          </h2>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
