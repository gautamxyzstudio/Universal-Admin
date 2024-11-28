import { IJobTypesEnum } from "@/constant/enums";

export interface IAddNewJobPostRequest {
  data: {
    job_name: string;
    required_certificates: string[] | null;
    city: string;
    address: string;
    postalCode: string;
    gender: string;
    eventDate: Date;
    salary: string;
    jobDuties: string;
    job_type: IJobTypesEnum;
    location: string;
    requiredEmployee: number;
    startShift: Date;
    endShift: Date;
    description: string;
  };
}
export interface IJobPostDetails {
  id: number;
  job_name: string;
  required_certificates: string[] | null;
  city: string;
  address: string;
  postalCode: string;
  gender: string;
  eventDate: Date;
  salary: string;
  jobDuties: string;
  job_type: IJobTypesEnum;
  location: string;
  requiredEmployee: number;
  startShift: Date;
  endShift: Date;
  description: string;
}
