export const Endpoints = {
  login: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local?populate=*`,
  getSubAdmins: (page: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/subAdmin?page=${page}&pageSize=10`,
  addNewSubAdmin: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  updateSubAdmin: (subAdminId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${subAdminId}`,
  getEmployees: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emp?populate=*`,
};
