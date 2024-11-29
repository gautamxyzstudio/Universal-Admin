import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  IAddANewFAQRequest,
  IAddNewFAQResponse,
  IFaqs,
  IGetFAQsCustomizeResponse,
  IGetFAQsResponse,
} from "./FAQsApi.types";

const FAQsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<IGetFAQsCustomizeResponse, { page: number }>({
      query: () => ({
        url: Endpoints.getFaqs,
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetFAQsResponse
      ): IGetFAQsCustomizeResponse => {
        const faqs: IFaqs[] = [];
        response.data.forEach((faq) => {
          faqs.push({
            id: faq.id,
            description: faq.attributes.FaqDsrc,
            title: faq.attributes.Title,
          });
        });
        return {
          data: faqs,
          meta: response.meta,
        };
      },
    }),
    addFaq: builder.mutation<IAddNewFAQResponse, IAddANewFAQRequest>({
      query: (body: IAddANewFAQRequest) => ({
        url: Endpoints.addFaq,
        method: ApiMethodType.post,
        body,
      }),
    }),
    editFaq: builder.mutation<
      IFaqs,
      { faqDetails: IAddANewFAQRequest; faqId: number }
    >({
      query: (body: { faqDetails: IAddANewFAQRequest; faqId: number }) => ({
        url: Endpoints.editFaq(body.faqId),
        method: ApiMethodType.PUT,
        body: body.faqDetails,
      }),
    }),
    deleteFaq: builder.mutation<IFaqs, { faqId: number }>({
      query: (body: { faqId: number }) => ({
        url: Endpoints.deleteFaq(body.faqId),
        method: ApiMethodType.delete,
      }),
    }),
  }),
});
export const {
  useGetFaqsQuery,
  useLazyGetFaqsQuery,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} = FAQsApi;
