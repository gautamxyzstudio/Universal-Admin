export interface IJobPostDetails{
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
}