import { ApiMethodType } from '@/api/ApiConstants';
import { baseApi } from '@/api/BaseApi';
import { Endpoints } from '@/api/Endpoints';
import {
  IAddANewCompanyRequest,
  IAddNewCompanyResponse,
  ICompany,
  IGetCompaniesCustomizedResponse,
  IGetCompaniesResponse,
} from './Company.types';
import { createImageUrl } from '@/utility/cookies';

const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query<
      IGetCompaniesCustomizedResponse,
      { page: number; search: string; perPage?: number }
    >({
      query: (body: { page: number; search: string; perPage?: number }) => ({
        url: Endpoints.getCompanies(body.page, body.search, body?.perPage),
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetCompaniesResponse
      ): IGetCompaniesCustomizedResponse => {
        const companies: ICompany[] = [];
        response.data.forEach((comp, index) => {
          companies.push({
            id: comp.id,
            sNum: index + 1,
            companyname: comp.attributes.companyname,
            companyemail: comp.attributes.companyemail,
            location: comp.attributes.location,
            contactno: comp.attributes.contactno,
            address: comp.attributes.address,
            Industry: comp.attributes.Industry,
            Website: comp.attributes.Website,
            regNo: comp.attributes.regNo,
            gstNo: comp.attributes.gstNo,
            companylogo: comp.attributes.companylogo?.data.attributes.url
              ? createImageUrl(comp.attributes.companylogo?.data.attributes.url)
              : null,
          });
        });
        return {
          data: companies,
          meta: response.meta,
        };
      },
    }),
    addCompany: builder.mutation<
      IAddNewCompanyResponse,
      IAddANewCompanyRequest
    >({
      query: (body: IAddANewCompanyRequest) => ({
        url: Endpoints.addCompany,
        method: ApiMethodType.post,
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetCompanyQuery,
  useGetCompanyQuery,
  useAddCompanyMutation,
} = companiesApi;
