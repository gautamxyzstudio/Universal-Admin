"use client";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import React, { useEffect, useState } from "react";
import { STRINGS } from "@/constant/en";
import {
  Add,
  DeleteForeverOutlined,
  EditOutlined,
  ExpandMore,
} from "@mui/icons-material";
import {
  useDeleteFaqMutation,
  useGetFaqsQuery,
  useLazyGetFaqsQuery,
} from "@/api/fetures/FAQs/FAQsApi";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";
import AddFaqsForm from "../AddFaqsForm/AddFaqsForm";
import { IFaqs } from "@/api/fetures/FAQs/FAQsApi.types";
import ConfirmationDialog from "@/components/molecules/DialogTypes/ComfirmationDialog/ConfirmationDialog";

const FaqTab = () => {
  const [fetchFAQs] = useLazyGetFaqsQuery();
  const [deleteFAQs] = useDeleteFaqMutation();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [faqData, setFAQsData] = useState<IFaqs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSelectedCard, setCurrentSelectedCard] = useState<IFaqs | null>(
    null
  );
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const fetchFAQsHandler = async () => {
    try {
      const res = await fetchFAQs({
        page: 1,
      }).unwrap();
      if (res) {
        console.log(res.data, "updated page: ");
        setIsLoading(false);
        setFAQsData(res?.data);
      }
    } catch (err) {
      setIsLoading(true);
      setFAQsData([]);
      console.log("Error fetching FAQs", err);
    }
  };

  useEffect(() => {
    fetchFAQsHandler();
  }, [faqData]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const faqsAddHandler = (faq: IFaqs) => {
    setFAQsData((prev) => {
      return [...prev, faq];
    });
  };

  const onPressEditHandler = (card: IFaqs) => {
    setCurrentSelectedCard(card);
    setShowFormModal(true);
  };

  const onPressClose =() =>{
    setShowFormModal(false);
    setCurrentSelectedCard(null);
  }

  const onPressDelete = (id: number) => {
    if (id) {
      setShowDialog(true);
      deleteHandler();
    }
  };
  const deleteHandler = async () => {
    if (currentSelectedCard && currentSelectedCard.id)
      try {
        const res = await deleteFAQs({
          faqId: currentSelectedCard.id,
        }).unwrap();
        if (res) {
          console.log("deleted FAQ: ");
        }
      } catch (err) {
        console.log("Error deleting FAQ", err);
      } finally {
      }
  };
  return (
    <>
      <div className="w-full h-[44px] flex justify-end items-center my-6 ">
        <CustomButton
          title={STRINGS.addFaq}
          onClick={() => setShowFormModal(true)}
          buttonType={"primary-small"}
          icon={<Add />}
        />
      </div>
      <div className="w-full h-full border-l border-borderGrey pl-4 overflow-hidden">
        <h3 className="text-[24px] leading-7 text-Black mb-6 ">
          {STRINGS.faqs}
        </h3>
        <div className="flex flex-col w-full gap-y-4 h-[76%] overflow-scroll scrollbar-none ">
          {faqData.map((faq, index) => {
            return (
              <Accordion
                key={index}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                sx={{}}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  {faq.title}
                </AccordionSummary>
                <AccordionDetails>{faq.description}</AccordionDetails>
                <AccordionActions
                  sx={{
                    "&": {
                      padding: "8px 16px",
                    },
                  }}
                >
                  <CustomButton
                    title={STRINGS.delete}
                    onClick={() => onPressDelete(faq.id)}
                    buttonType={"outline-small-red"}
                    icon={<DeleteForeverOutlined />}
                  />
                  <CustomButton
                    title={STRINGS.edit}
                    onClick={() => onPressEditHandler(faq)}
                    buttonType={"outline-small-green"}
                    icon={<EditOutlined />}
                  />
                </AccordionActions>
              </Accordion>
            );
          })}
        </div>
      </div>
      <AddFaqsForm
        currentSelectFaq={currentSelectedCard}
        show={showFormModal}
        setGlobalModalState={(state) => setShowFormModal(state)}
        onAddFaqHandler={faqsAddHandler}
      />
      <ConfirmationDialog
        type={"logout"}
        onPressLogout={deleteHandler}
        onClose={onPressClose}
        open={showDialog}
      />
    </>
  );
};

export default FaqTab;
