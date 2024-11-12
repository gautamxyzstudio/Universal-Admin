import { IJobPostStatus, IJobTypesEnum } from "./enums";

export const getJobStatus = (status: IJobPostStatus) => {
  switch (status) {
    case IJobPostStatus.APPLIED:
      return "Applied";
    case IJobPostStatus.DECLINED:
      return "Declined";
    case IJobPostStatus.CANCELED:
      return "Canceled";
    case IJobPostStatus.CONFIRMED:
      return "Confirmed";
    case IJobPostStatus.COMPLETED:
      return "Completed";
    case IJobPostStatus.OPEN:
      return "Open";
    case IJobPostStatus.CLOSED:
      return "Closed";
    case IJobPostStatus.NO_SHOW:
      return "No Show";
    default:
      return "Applied";
  }
};

export const getJobType = (jobType: IJobTypesEnum) => {
  switch (jobType) {
    case IJobTypesEnum.EVENT:
      return "Event";
    case IJobTypesEnum.STATIC:
      return "Static";
    default:
      return "Event";
  }
};
