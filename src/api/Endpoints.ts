export const Endpoints = {
  login: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local?populate=*`,
  getSubAdmins: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/subAdmin`,
  addNewSubAdmin: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`,
  updateSubAdmin: (subAdminId: number) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${subAdminId}`,
};
