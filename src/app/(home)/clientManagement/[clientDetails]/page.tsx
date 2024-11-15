"use client";
import { useGetClientDetailsQuery } from "@/api/fetures/Client/ClientApi";
import Switch from "@/components/atoms/Switch/Switch";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import PageSubHeader from "@/components/organism/PageSubHeader/PageSubHeader";
import { STRINGS } from "@/constant/en";
import { dateMonthFormat } from "@/utility/utils";
import { Skeleton } from "@mui/material";
import React from "react";

const ClientDetails = ({ params }: { params: { clientDetails: string } }) => {
  console.log(params);
  const { data } = useGetClientDetailsQuery(params.clientDetails);
  console.log(data);
  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        pageTitle={STRINGS.clientManagement}
        name={data?.companyName || ""}
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
              <div className="flex justify-between w-full h-fit">
                <UserNameWithImage
                  name={data.name || ""}
                  containorStyle="!text-[16px] !leading-[20px]"
                  image={data.companyLogo}
                  imageStyle="!w-14 !h-14"
                  companyName={data.companyName || ""}
                  companyNameStyle="!text-[14px] !leading-[18px] !w-fit"
                  joinDate={dateMonthFormat(data.createdAt)}
                  
                />
                <Switch checked={data.status === 's1'? true : false} onChange={function (event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean): void {
                    throw new Error("Function not implemented.");
                  } } label={data.status} switchClassName={"!float-end"}/>
                
              </div>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
          selectedItem
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
