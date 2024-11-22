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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/client?page=${page}&pageSize=10&populate=*`,
  getPendingRequests: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/findPendingClients?page=${page}&pageSize=20`,
  linkClient: (userId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details/${userId}`,
  addClientDetails: `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details`,
  getCompanyDetails: (companyId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details/${companyId}?populate=*`,
  getOpenJobPost: (detailsId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/find-Openjob/${detailsId}`,
  getClosedJobPost: (detailsId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/find-Closejob/${detailsId}`,
  getCompanyClients: (companyId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details/${companyId}/clients?populate=*`,
  getClientDetails: (client_id: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details/${client_id}`,
  getPostJobsByClient: (client_id: number, page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/client/${client_id}?page=${page}&pageSize=5&populate=*`,
  updateDocumentStatus: (docId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/employee-details/${docId}/document-statuses`,
};
