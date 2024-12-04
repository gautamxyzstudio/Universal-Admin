import { IJobPost } from "@/api/fetures/Employee/EmployeeApi.types";
import { IJobPostStatus, IJobTypesEnum } from "@/constant/enums";

export interface IJobPostEditFromProps {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  onPostEditHandler: (post: IJobPost) => void;
  currentPost: IJobPost | null;
}

export type IEditJobPostState = {
  jobName: string;
  jobDescription: string;
  jobDuties: string;
  jobType: IJobTypesEnum;
  eventDate: Date | string;
  startShift: Date | string;
  endShift: Date | string;
  location: string;
  address: string;
  city: string;
  postalCode: string;
  requiredEmployee: number;
  salary: string;
  requiredCertificates: string[] | null;
  gender: string;
  status: IJobPostStatus;
};

export enum JobPostStateFields {
  JOB_NAME = "jobName",
  JOB_DESCRIPTION = "jobDescription",
  JOB_DUTIES = "jobDuties",
  JOB_TYPE = "jobType",
  EVENT_DATE = "eventDate",
  START_SHIFT = "startShift",
  END_SHIFT = "endShift",
  LOCATION = "location",
  ADDRESS = "address",
  CITY = "city",
  POSTAL_CODE = "postalCode",
  REQUIRED_EMPLOYEE = "requiredEmployee",
  SALARY = "salary",
  REQUIRED_CERTIFICATES = "requiredCertificates",
  GENDER = "gender",
}
