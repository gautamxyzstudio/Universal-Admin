import { IFaqs } from "@/api/fetures/FAQs/FAQsApi.types";

export type IAddFaqsFormProps ={
    show: boolean;
    setGlobalModalState: (state: boolean) => void;
    onAddFaqHandler: (faq: IFaqs) => void;
    currentSelectFaq:IFaqs | null;
}
export type IAddFaqsState ={
    faqTitle: string;
    faqDescription: string;
    faqTitleError: string;
    faqDescriptionError: string;
}

export enum FaqsStateFields{
    FAQ_TITLE = "faqTitle",
    FAQ_DESCRIPTION = "faqDescription",
}