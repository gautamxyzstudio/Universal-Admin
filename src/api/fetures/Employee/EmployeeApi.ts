/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  ICustomizedEmployeeApiResponse,
  IEmployeeBasic,
  IGetEmployeeApiResponse,
} from './EmployeeApi.types';
import { IDocumentStatus } from '@/constant/enums';
import { createImageUrl } from '@/utility/cookies';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<ICustomizedEmployeeApiResponse, any>({
      query: (pageNo: number) => ({
        url: Endpoints.getEmployees(pageNo),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetEmployeeApiResponse
      ): ICustomizedEmployeeApiResponse => {
        const employees: IEmployeeBasic[] = response.data.map((employee) => ({
          id: employee.id,
          name: employee.euser_id?.name,
          selfie: employee?.euser_id
            ? employee?.euser_id?.selfie
              ? createImageUrl(employee.euser_id.selfie[0].url)
              : ''
            : '',
          detailsId: employee.euser_id?.id,
          gender: employee.euser_id?.gender,
          email: employee.euser_id?.email,
          phone: employee.euser_id?.phone,
          sinNo: employee.euser_id?.sinNo,
          workStatus: employee.euser_id?.workStatus,
          docStatus: IDocumentStatus.PENDING,
        }));
        return {
          employees,
          pagination: {
            page: response.meta.page,
            pageSize: response.meta.pageSize,
            total: response.meta.total,
            totalPages: response.meta.totalPages,
          },
        };
      },
    }),
  }),
});

export const { useLazyGetEmployeesQuery } = authApi;
