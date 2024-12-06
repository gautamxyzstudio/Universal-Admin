import React from "react";
import { Icons } from "../../../../public/exporter";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import { STRINGS } from "@/constant/en";
import TextGroup from "../TextGroup/TextGroup";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import {
  dateMonthFormat,
  getJobStatusColor,
  timeFormat,
} from "@/utility/utils";
import { getJobStatus, getJobType } from "@/constant/constant";
import { IJobPost } from "@/api/fetures/Employee/EmployeeApi.types";
import CustomMenuComponent from "@/components/atoms/CustomMenuComponent/CustomMenuComponent";
import { ITextGroupTypes } from "../TextGroup/TextGroup.types";
import { IJobPostStatus } from "@/constant/enums";
import { MoreVertOutlined } from "@mui/icons-material";

const JobDetails = ({
  data,
  isEmployee,
  onPressMenuItem,
}: {
  data: IJobPost;
  onPressMenuItem?: (item: string) => void;
  isEmployee: boolean;
}) => {
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between pb-3 border-b border-borderGrey w-full">
          <div className="flex-1">
            <UserNameWithImage
              image={data.client_details?.companylogo ?? ''}
              name={data.job_name}
              containerStyle={
                !isEmployee ? "!flex-col !items-start gap-y-3" : ""
              }
              companyName={isEmployee ? data.client_details?.companyname : ""}
              imageStyle="!w-14 !h-14"
              nameStyle="font-bold !text-[24px] !leading-[28px]"
              postby={data.client_details?.clientName}
              postbyStyle="text-disable !text-[16px] !leading-[20px]"
              subText={
                !isEmployee
                  ? data.notAccepting === false
                    ? ""
                    : STRINGS.notAccept
                  : ""
              }
            />
          </div>
          <div className=" flex flex-col justify-between items-end">
            {!isEmployee && data?.status === IJobPostStatus.OPEN && (
              <CustomMenuComponent
                menuButton={<MoreVertOutlined />}
                isOpen={true}
                data={[
                  {
                    icon: Icons.crossForm,
                    value: STRINGS.close,
                    onPresItem: () =>
                      onPressMenuItem && onPressMenuItem(STRINGS.close),
                  },
                  {
                    icon: Icons.pencil,
                    value: STRINGS.edit,
                    onPresItem: () =>
                      onPressMenuItem && onPressMenuItem(STRINGS.edit),
                  },
                ]}
              />
            )}
            <div />

            <TextWithBgColor
              textLabel={getJobStatus(data?.status)}
              textStyle={getJobStatusColor(data?.status)}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-y-3 gap-x-5 flex-wrap">
          <TextGroup
            icon={Icons.event}
            title={STRINGS.jobType}
            text={getJobType(data.job_type)}
          />
          <TextGroup
            icon={Icons.dollar}
            title={STRINGS.wageRate}
            text={data.salary + "$ /hr"}
          />
          <TextGroup
            icon={Icons.timeDate}
            title={STRINGS.shiftTime}
            subTitle={STRINGS.date}
            text={
              timeFormat(data.startShift ?? new Date()) +
              " - " +
              timeFormat(data.endShift ?? new Date())
            }
            subText={dateMonthFormat(data.eventDate ?? new Date())}
            type={ITextGroupTypes.DateAndTime}
          />
          {isEmployee && data.CheckIn && (
            <TextGroup
              icon={Icons.check_in}
              title={STRINGS.checkin}
              titleStyle="text-green"
              text={timeFormat(data.CheckIn)}
            />
          )}
          {isEmployee && data.CheckOut && (
            <TextGroup
              icon={Icons.check_in}
              titleStyle="text-red"
              title={STRINGS.checkin}
              text={timeFormat(data.CheckOut)}
            />
          )}
        </div>
        <div className="w-[266px] flex flex-col gap-y-3 mt-6 text-[14px] leading-[18px]">
          <TextGroup
            title={STRINGS.post_ID}
            titleStyle="!text-Black font-bold"
            type={ITextGroupTypes.textType}
            text={data.postID}
          />
          <TextGroup
            title={STRINGS.reqcandidate}
            titleStyle="!text-Black font-bold"
            type={ITextGroupTypes.textType}
            text={data.requiredEmployee ?? ""}
          />
          <TextGroup
            title={STRINGS.gender}
            titleStyle="!text-Black font-bold"
            type={ITextGroupTypes.textType}
            text={data.gender}
          />
        </div>
        <div className="flex flex-col gap-y-4 text-[14px] leading-[18px] mt-6">
          {data.description && (
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.jobDes}</span>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          )}
          {data.jobDuties && (
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.jobDut}</span>
              <div dangerouslySetInnerHTML={{ __html: data.jobDuties }} />
            </div>
          )}
          {data.required_certificates && (
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.reqCert}</span>
              <span className="ml-2">
                <ul className="list-inside list-disc">
                  {data.required_certificates?.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </span>
            </div>
          )}
          {data.address && (
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.address}</span>
              <span>{data.address}</span>
            </div>
          )}
        </div>
        <div className="h-6" />
      </div>
    </>
  );
};

export default JobDetails;
