import {
  IIssueRaisedStatusEnum,
  IJobPostStatus,
  IJobTypesEnum,
  IUserTypesEnum,
} from "./enums";

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

export const getUsersType = (type: IUserTypesEnum) => {
  switch (type) {
    case IUserTypesEnum.EMPLOYEE:
      return "Employee";
    case IUserTypesEnum.CLIENT:
      return "Client";
    case IUserTypesEnum.SUPERADMIN:
      return "SuperAdmin";
    default:
      return "Employee";
  }
};

export const getIssueRaisedStatus = (status: IIssueRaisedStatusEnum) => {
  switch (status) {
    case IIssueRaisedStatusEnum.OPEN:
      return "Open";
    case IIssueRaisedStatusEnum.CLOSED:
      return "Closed";
    case IIssueRaisedStatusEnum.NO_ISSUE:
      return "Not an issue";
    default:
      return "Not an issue";
  }
};
