'use client'
import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import React from "react";
import { STRINGS } from "@/constant/en";
import { Add } from "@mui/icons-material";
import { useGetFaqsQuery } from "@/api/fetures/FAQs/FAQsApi";
import { getUserDetailsFromCookies } from "@/utility/cookies";

const FaqTab = () => {
  const {data} = useGetFaqsQuery("")
console.log(data, "Faqs tab")
console.log(getUserDetailsFromCookies(), "token")
  return (
    <>
      <div className="w-full h-[44px] flex justify-end items-center my-6 ">
        
        <CustomButton
        title={STRINGS.addFaq}
        onClick={()=> console.log("Add")}
        buttonType={"primary-small"}
        icon={<Add/>}
      />
      </div>
      <div className="w-full h-full border-l border-borderGrey">
<h3 className="text-[24px] leading-7 text-Black mb-6 ml-4">{STRINGS.faqs}</h3>
      </div>
    </>
  );
};

export default FaqTab;
