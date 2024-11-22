export const Endpoints = {
  login: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local?populate=*`,
  getSubAdmins: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/subAdmin?page=${page}&pageSize=20`,
  addNewSubAdmin: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  registerClient: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  updateSubAdmin: (subAdminId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${subAdminId}`,
  getEmployees: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emp?populate=*`,
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
  getCompanyDetails: (companyId: number) =>`${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details/${companyId}?populate=*&sort=id:desc`,
  getOpenJobPost: (detailsId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/find-Openjob/${detailsId}?sort=id:desc`,
  getClosedJobPost: (detailsId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/find-Closejob/${detailsId}?sort=id:desc`,
  getCompanyClients : (companyId: number) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details/${companyId}/clients?populate=*&sort=id:desc`,
  getClientDetails: (client_id: number) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details/${client_id}?sort=id:desc`,
  getPostJobsByClient: (client_id: number, page: number, perPage:number ) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/client/${client_id}?populate=*&sort=id:desc&page=${page}&pageSize=${perPage}`,
  getFaqs: `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs?sort=id:desc`,
  addFaq: `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs`,
  editFaq: (faq_id: number) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs/${faq_id}`,
  deleteFaq: (faq_id: number) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs/${faq_id}`,
};

