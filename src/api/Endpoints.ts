export const Endpoints = {
  login: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local?populate=*`,
  getSubAdmins: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/subAdmin?page=${page}&pageSize=10`,
  addNewSubAdmin: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  registerClient: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  updateSubAdmin: (subAdminId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${subAdminId}`,
  getEmployees: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emp?populate=*`,
  getCompanies: (page: number, search: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details?pagination[page]=${page}&pagination[pageSize]=15&search=${search}`,
  addCompany: `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-details?populate=*`,
  uploadFiles: `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
  getClients: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/client?page=${page}&pageSize=20&populate=*`,
  getPendingRequests: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/findPendingClients?page=${page}&pageSize=10`,
  linkClient: (userId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details/${userId}`,
  addClientDetails: `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-details`,
};
