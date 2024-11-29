import React, { useEffect, useState } from "react";
import { Icons } from "../../../../public/exporter";
import TextWithBgColor from "@/components/molecules/TextWithBgColor/TextWithBgColor";
import { STRINGS } from "@/constant/en";
import TextGroup from "../TextGroup/TextGroup";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { MoreVertOutlined } from "@mui/icons-material";
import { IconButton, Menu, Fade, MenuItem } from "@mui/material";
import { dateMonthFormat, timeFormat } from "@/utility/utils";
import { getJobStatus, getJobType } from "@/constant/constant";
import { IJobPostTypes } from "@/api/fetures/Company/Company.types";
import JobPostEditForm from "@/components/templates/JobPostEditForm/JobPostEditForm";

const JobDetails = ({ data }: { data: IJobPostTypes }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false);
  const [jobPostDetails, setJobPostDetails] = useState<IJobPostTypes>();
  const [currentSelectPostCard, setCurrentSelectPostCard] =
    useState<IJobPostTypes | null>(null);

  useEffect(() => {
    setJobPostDetails(data);
  }, [data]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (card: IJobPostTypes) => {
    setCurrentSelectPostCard(card);
    setAnchorEl(null);
    setOpenFormDrawer(true);
  };
  const onPostEditHandler = (data: IJobPostTypes) => {
    setJobPostDetails((prev) => ({ ...prev, ...data }));
  };

  const statusStyle =
    jobPostDetails?.status === "s0"
      ? "text-green bg-statusLightGreen"
      : "text-red bg-lightRedSecondary";
  return (
    <>
      {jobPostDetails && jobPostDetails !== null ? (
        <div className="w-full h-fit">
          <div className="flex justify-between pb-3 border-b border-borderGrey w-full">
            <UserNameWithImage
              image={
                jobPostDetails.client_details?.company_detail?.companylogo?.url
              }
              containorStyle="!flex-col !items-start gap-y-3"
              name={jobPostDetails.job_name}
              imageStyle="!w-10 !h-10"
              nameStyle="font-bold !text-[24px] !leading-[28px]"
              postBy={jobPostDetails.client_details?.Name}
              postByStyle="text-disable !text-[16px] !leading-[20px]"
              subText={
                jobPostDetails.notAccepting === false ? "" : STRINGS.notAccept
              }
            />
            <div className="flex flex-col justify-between items-end text-[12px] leading-4 w-full">
              {jobPostDetails.status === "s0" ? (
                <>
                  <IconButton
                    id="openMenu"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    sx={{ padding: 0 }}
                    onClick={handleClick}
                  >
                    <MoreVertOutlined />
                  </IconButton>
                  <Menu
                    open={open}
                    anchorEl={anchorEl}
                    MenuListProps={{
                      "aria-labelledby": "openMenu",
                    }}
                    sx={{
                      left: 0,
                      ".MuiList-root": {
                        padding: "0px",
                      },
                      ".MuiMenuItem-root": {
                        padding: "12px 125px 12px 12px",
                        gap: "12px",
                        fontSize: "12px",
                        lineHeight: "16px",
                      },
                    }}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleClose}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8.93335 8.00008L13.1334 3.80008C13.4 3.53341 13.4 3.13341 13.1334 2.86675C12.8667 2.60008 12.4667 2.60008 12.2 2.86675L8.00002 7.06675L3.80002 2.86675C3.53335 2.60008 3.13335 2.60008 2.86669 2.86675C2.60002 3.13341 2.60002 3.53341 2.86669 3.80008L7.06669 8.00008L2.86669 12.2001C2.73335 12.3334 2.66669 12.4667 2.66669 12.6667C2.66669 13.0667 2.93335 13.3334 3.33335 13.3334C3.53335 13.3334 3.66669 13.2667 3.80002 13.1334L8.00002 8.93341L12.2 13.1334C12.3334 13.2667 12.4667 13.3334 12.6667 13.3334C12.8667 13.3334 13 13.2667 13.1334 13.1334C13.4 12.8667 13.4 12.4667 13.1334 12.2001L8.93335 8.00008Z"
                          fill="#121212"
                        />
                      </svg>
                      <span>Close</span>
                    </MenuItem>
                    <MenuItem onClick={() => handleEditClick(data)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.6568 2.34311C14.4379 3.12416 14.4379 4.39049 13.6568 5.17154L6.27038 12.558C5.94998 12.8784 5.54853 13.1057 5.10895 13.2156L2.81795 13.7883C2.45176 13.8799 2.12006 13.5482 2.21161 13.182L2.78436 10.891C2.89426 10.4514 3.12155 10.05 3.44195 9.72957L10.8284 2.34311C11.6095 1.56206 12.8758 1.56206 13.6568 2.34311ZM10.1212 4.46432L4.14906 10.4367C3.95682 10.6289 3.82044 10.8698 3.7545 11.1335L3.38387 12.6161L4.86641 12.2454C5.13016 12.1795 5.37103 12.0431 5.56327 11.8509L11.5352 5.87832L10.1212 4.46432ZM11.5355 3.05022L10.8282 3.75732L12.2422 5.17132L12.9497 4.46443C13.3403 4.07391 13.3403 3.44074 12.9497 3.05022C12.5592 2.65969 11.926 2.65969 11.5355 3.05022Z"
                          fill="#121212"
                        />
                      </svg>
                      <span>Edit</span>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div />
              )}

              <div className="flex gap-x-1 w-full justify-end">
                <TextWithBgColor
                  textLabel={getJobStatus(jobPostDetails.status)}
                  textStyle={statusStyle}
                />
                <TextWithBgColor
                  textLabel={STRINGS.viewCheckin}
                  textStyle={"text-darkBlue bg-secondaryShade"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-5 mt-4 justify-between">
            <TextGroup
              icon={Icons.event}
              title={STRINGS.jobType}
              text={getJobType(jobPostDetails.job_type)}
              divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]"
              textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
            />
            <TextGroup
              icon={Icons.dollar}
              title={STRINGS.wageRate}
              text={jobPostDetails.salary + "$ /hr"}
              divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]"
              textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
            />
            <TextGroup
              icon={Icons.timeDate}
              title={STRINGS.shiftTime}
              subTitle={STRINGS.date}
              text={
                timeFormat(jobPostDetails.startShift) +
                " - " +
                timeFormat(jobPostDetails.endShift)
              }
              subText={dateMonthFormat(jobPostDetails.startShift)}
              divStyle="bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-fit"
              textgroupStyle="flex flex-col gap-y-[2px] text-[14px] leading-[18px]"
            />
          </div>
          <div className="w-[266px] flex flex-col gap-y-3 mt-6 text-[14px] leading-[18px]">
            <TextGroup
              title={STRINGS.post_ID}
              titleStyle="!text-Black font-bold"
              textgroupStyle="flex justify-between w-full"
              text={jobPostDetails.id}
            />
            <TextGroup
              title={STRINGS.reqcandidate}
              titleStyle="!text-Black font-bold"
              textgroupStyle="flex justify-between w-full"
              text={jobPostDetails.requiredEmployee}
            />
            <TextGroup
              title={STRINGS.gender}
              titleStyle="!text-Black font-bold"
              textgroupStyle="flex justify-between w-full"
              text={jobPostDetails.gender}
            />
          </div>
          <div className="flex flex-col gap-y-4 text-[14px] leading-[18px] mt-6">
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.jobDes}</span>
              <div
                dangerouslySetInnerHTML={{ __html: jobPostDetails.description }}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.jobDuty}</span>
              <div
                dangerouslySetInnerHTML={{ __html: jobPostDetails.jobDuties }}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.address}</span>
              <span>{jobPostDetails.location}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">{STRINGS.reqCert}</span>
              <span className="ml-2">
                <ul className="list-inside list-disc">
                  {jobPostDetails.required_certificates?.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-fit">{STRINGS.noJobs}</div>
      )}
      {openFormDrawer && (
        <JobPostEditForm
          show={openFormDrawer}
          onPostEditHandler={onPostEditHandler}
          setGlobalModalState={(state) => setOpenFormDrawer(state)}
          currentPost={currentSelectPostCard}
        />
      )}
    </>
  );
};

export default JobDetails;
