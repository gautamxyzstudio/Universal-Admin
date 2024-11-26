import { IJobPostTypes } from "@/api/fetures/Company/Company.types";

export interface IJobPostEditFromProps {
    show: boolean;
    setGlobalModalState: (state: boolean) => void;
    onPostEditHandler?: (post: IJobPostTypes) => void;
    currentPost: IJobPostTypes | null; 
}

export interface IEditorDialogProps {
    open: boolean;
    onClose:
    | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
    data : string;
    onClickBack: () => void;
    onClickUpdate: (data : string) => void;
}

export type IEditJobPostState ={
    jobName: string;
    jobDescription: string;
    jobDuties: string;
    jobType: string ;
    eventDate: string | Date;
    startShift: string | Date;
    endShift: string | Date;
    location: string;
    address: string;
    city: string;
    postalCode: string;
    requiredEmployee: string;
    salary: string;
    requiredCertificates: string | string[];
    gender: string;
    jobNameError: string;
    jobDescriptionError: string;
    jobDutiesError: string;
    jobTypeError: string;
    eventDateError: string;
    startShiftError: string;
    endShiftError: string;
    locationError: string;
    addressError: string;
    cityError: string;
    postalCodeError: string;
    requiredEmployeeError: string;
    salaryError: string;
    requiredCertificatesError: string;
    genderError: string;
}

export enum JobPostStateFields{
    JOB_NAME= 'jobName',
    JOB_DESCRIPTION= 'jobDescription',
    JOB_DUTIES= 'jobDuties',
    JOB_TYPE= 'jobType',
    EVENT_DATE= 'eventDate',
    START_SHIFT='startShift',
    END_SHIFT= 'endShift',
    LOCATION= 'location',
    ADDRESS= 'address',
    CITY= 'city',
    POSTAL_CODE= 'postalCode',
    REQUIRED_EMPLOYEE= 'requiredEmployee',
    SALARY='salary',
    REQUIRED_CERTIFICATES='requiredCertificates',
    GENDER= 'gender'
}