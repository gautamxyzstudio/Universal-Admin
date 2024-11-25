import React from "react";
import { Icons, Images } from "../../../../public/exporter";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import { STRINGS } from "@/constant/en";
import TextGroup from "../TextGroup/TextGroup";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";

const WorkDetails = () => {
  return (
    <div className="w-full h-fit">
      <div className="flex justify-between pb-3 border-b border-borderGrey w-full">
        <UserNameWithImage
          image={Images.demoImg}
          name="Security Guard"
          imageStyle="!w-14 !h-14"
          nameStyle="font-bold !text-[24px] !leading-[28px]"
          companyName="Cosmic Security"
          companyNameStyle="text-disable !text-[24px] !leading-[28px]"
        />
        <div className="flex gap-x-1 text-[12px] leading-4">
          <TextWithBgColor
            textLabel={STRINGS.event}
            textStyle={"text-Black bg-backgroundLight "}
          />
          <TextWithBgColor
            textLabel={STRINGS.applied}
            textStyle={"text-darkBlue bg-secondaryShade"}
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <TextGroup
          icon={Icons.event}
          title={"Job type"}
          text={"Event"}
          divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]"
          textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
        />
        <TextGroup
          icon={Icons.dollar}
          title={"Wage rate"}
          text={"20$ /hr"}
          divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]"
          textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
        />
        <TextGroup
          icon={Icons.clock}
          title={"Shift time"}
          text={"7 pm - 2 am"}
          divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]"
          textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
        />
        <TextGroup
          icon={Icons.calendar}
          title={"Date"}
          text={"2 Jun - 3 Jun"}
          divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]"
          textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
        />
      </div>
      <div className="w-[266px] flex flex-col gap-y-3 mt-6 text-[14px] leading-[18px]">
        <TextGroup
          title={STRINGS.reqcandidate}
          titleStyle="!text-Black font-bold"
          textgroupStyle="flex justify-between w-full"
          text={"12"}
        />
        <TextGroup
          title={STRINGS.yoe}
          titleStyle="!text-Black font-bold"
          textgroupStyle="flex justify-between w-full"
          text={"0-1"}
        />
        <TextGroup
          title={STRINGS.gender}
          titleStyle="!text-Black font-bold"
          textgroupStyle="flex justify-between w-full"
          text={STRINGS.male}
        />
      </div>
      <div className="flex flex-col gap-y-4 text-[14px] leading-[18px] mt-6">
        <div className="flex flex-col gap-y-2">
          <span className="font-bold">{STRINGS.jobDes}</span>
          <span>
            We are seeking a vigilant and responsible Security Guard to join our
            team. The ideal candidate will be dependable, possess excellent
            observational skills, and have a keen sense of responsibility.
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-bold">{STRINGS.jobDuty}</span>
          <span className="ml-2">
            <ul className="list-inside list-disc">
              <li>
                Monitor and control access at building entrances and vehicle
                gates.
              </li>
              <li>Monitor surveillance cameras and alarm systems.</li>
              <li>Respond to alarms and investigate disturbances.</li>
              <li>Enforce company policies and procedures.</li>
              <li>
                Assist in emergency situations, including evacuations and
                medical emergencies.
              </li>
              <li>
                Collaborate with law enforcement and emergency services when
                required.
              </li>
            </ul>
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-bold">{STRINGS.address}</span>
          <span>
            #123 near cp-mall, International Airport Road, Sector 67, Sahibzada
            Ajit Sing Nagar, Punjab, India
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-bold">{STRINGS.reqCert}</span>
          <span className="ml-2">
            <ul className="list-inside list-disc">
              <li>High school diploma or equivalent.</li>
              <li>
                Valid Security Guard license (as per provincial regulations).
              </li>
              <li>
                Previous experience in security or a related field is preferred.
              </li>
              <li>Proficiency in English (both written and verbal).</li>
              <li>
                Good physical condition with the ability to walk and stand for
                extended periods.
              </li>
              <li>Ability to work in varying weather conditions.</li>
              <li>
                Ability to handle sensitive and confidential information with
                discretion.
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;
