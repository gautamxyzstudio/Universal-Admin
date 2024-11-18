import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import {
  IAddANewFAQRequest,
  IAddNewFAQRespone,
  IFAQs,
  IGetFAQsCustomizeResponse,
  IGetFAQsRespone,
} from "./FAQsApi.types";

const FAQsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: Endpoints.getFaqs,
        method: ApiMethodType.get,
      }),
      transformResponse: (
        response: IGetFAQsRespone
      ): IGetFAQsCustomizeResponse => {
        const faqs: IFAQs[] = [];
        response.data.forEach((faq) => {
          faqs.push({
            id: faq.id,
            FaqDsrc: faq.attributes.FaqDsrc,
            Title: faq.attributes.Title,
          });
        });
        return {
          data: faqs,
          meta: response.meta,
        };
      },
    }),
    addFaq: builder.mutation<IAddNewFAQRespone, IAddANewFAQRequest>({
      query: (body: IAddANewFAQRequest) => ({
        url: Endpoints.addFaq,
        method: ApiMethodType.post,
        body,
      }),
    }),
    editFaq: builder.mutation<IFAQs, {faqDetails: IAddANewFAQRequest, faqId:number}>({
        query: (body:{
            faqDetails: IAddANewFAQRequest,
            faqId: number
        })=> ({
            url: Endpoints.editFaq(body.faqId),
            method: ApiMethodType.PUT,
            body: body.faqDetails
        })
    }),
    
  }),
});
export const { useGetFaqsQuery, useLazyGetFaqsQuery } = FAQsApi;
