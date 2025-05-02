import { IIssueRaisedStatusEnum } from '@/constant/enums';
import {
  getIssueRaisedByClientUrl,
  getIssueRaisedByEmployeeUrl,
} from './types';

export const Endpoints = {
  login: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local?populate=*`,
  getSubAdmins: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/subAdmin?page=${page}&pageSize=20`,
  addNewSubAdmin: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  registerClient: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  updateSubAdmin: (subAdminId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${subAdminId}`,
  getEmployees: (searchVal: string, page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emp?search=${searchVal}&page=${page}&pageSize=10&populate=*`,
  getEmployeesById: (id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee-details/${id}`,
  getCompanies: (page: number, search: string, perPage?: number) =>
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/company-details?pagination[page]=${page}&pagination[pageSize]=${
      perPage ? perPage : 15
    }&search=${search}&sort=id:desc`,
  addCompany: `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details?populate=*`,
  uploadFiles: `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
  getClients: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/client?page=${page}&pageSize=20&populate=*&sort=id:desc`,
  getPendingRequests: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/findPendingClients?page=${page}&pageSize=20&sort=id:desc`,
  linkClient: (userId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details/${userId}`,
  addClientDetails: `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details`,
  getCompanyDetails: (companyId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details/${companyId}?populate=*&sort=id:desc`,
  getOpenJobPost: (detailsId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/find-Openjob/${detailsId}?sort=id:desc`,
  getClosedJobPost: (detailsId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/find-Closejob/${detailsId}?sort=id:desc`,
  updateJobPost: (jobPostId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${jobPostId}`,
  getCompanyClients: (companyId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details/${companyId}/clients?populate=*&sort=id:desc`,
  getClientDetails: (client_id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details/${client_id}?sort=id:desc`,
  getPostJobsByClient: (client_id: number, page: number, perPage: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/client/${client_id}?populate=*&sort=id:desc&page=${page}&pageSize=${perPage}`,
  getFaqs: `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs?sort=id:desc`,
  addFaq: `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs`,
  editFaq: (faq_id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs/${faq_id}`,
  deleteFaq: (faq_id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs/${faq_id}`,
  updateDocumentStatus: (docId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee-details/${docId}/document-statuses`,
  getEmployeeJobHistory: (id: number, pageNumber: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/employee/${id}?status=s6&[page]=${pageNumber}&[pageSize]=10`,
  updateOtherDocsStatus: (docId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/other-documents/${docId}`,
  mutateUpdateDocRequest: (docId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/document-requests/${docId}/status`,
  getHelpSupportIssueByEmployee: (
    searchVal: string,
    page: number,
    status: IIssueRaisedStatusEnum
  ) => getIssueRaisedByEmployeeUrl(searchVal, page, status),
  getHelpSupportIssueByClient: (
    searchVal: string,
    page: number,
    status: IIssueRaisedStatusEnum
  ) => getIssueRaisedByClientUrl(searchVal, page, status),
  getUsers: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/findAllUsers`,
  getIssueRaisedById: (id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raiseds/${id}?populate=*`,
  updateIssueStatusIsResolveById: (id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raiseds/${id}/resolve`,
  updateIssueStatusIsNotAnIssueById: (id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/issue-raiseds/${id}/not-an-issue`,
  analytics: `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`,
};
