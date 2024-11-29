/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import React, { useEffect, useState } from "react";
import { STRINGS } from "@/constant/en";
import { Add, ArrowDropDown } from "@mui/icons-material";
import {
  useDeleteFaqMutation,
  useLazyGetFaqsQuery,
} from "@/api/fetures/FAQs/FAQsApi";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Skeleton,
} from "@mui/material";
import AddFaqsForm from "../AddFaqsForm/AddFaqsForm";
import { IFaqs } from "@/api/fetures/FAQs/FAQsApi.types";
import ConfirmationDialog from "@/components/molecules/DialogTypes/ConfirmationDialog/ConfirmationDialog";
import { useShowLoaderContext } from "@/contexts/LoaderContext/LoaderContext";
import { useSnackBarContext } from "@/providers/SnackbarProvider";
import { ICustomErrorResponse } from "@/api/types";

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
  const { changeLoaderState } = useShowLoaderContext();
  const { displaySnackbar } = useSnackBarContext();

  const fetchFAQsHandler = async () => {
    try {
      const res = await fetchFAQs({
        page: 1,
      }).unwrap();
      if (res) {
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
    setShowDialog(false);
  };

  // for Dialog box
  const onPressClose = () => {
    setShowDialog(false);
  };

  const onPressDelete = (value: IFaqs) => {
    setCurrentSelectedCard(value);
    setShowDialog(true);
  };

  const faqDeleteHandler = async (id: number) => {
    if (id) {
      try {
        changeLoaderState(true);
        const res = await deleteFAQs({
          faqId: id,
        }).unwrap();
        if (res) {
          displaySnackbar("success", "FAQs successfully deleted");
          setFAQsData((prevData) => prevData.filter((faq) => faq.id !== id));
        }
      } catch (err) {
        const error = err as ICustomErrorResponse;
        displaySnackbar("error", error.message);
      } finally {
        changeLoaderState(false);
      }
    }
  };

  // handle delete button
  const deleteHandler = () => {
    setShowDialog(false);
    if (currentSelectedCard) {
      faqDeleteHandler(currentSelectedCard?.id);
    }
  };

  // handle set global state for press cross button
  const modalStateChangeHandler = (state: boolean) => {
    setShowFormModal(state);
    setShowDialog(state);
    if (state === false) {
      setCurrentSelectedCard(null);
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    width="100%"
                    height={60}
                  />
                );
              })
            : faqData.map((faq, index) => {
                return (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index + 1}`}
                    onChange={handleChange(`panel${index + 1}`)}
                    sx={{
                      boxShadow: "none",
                      border: "1px solid",
                      borderRadius: "8px",
                      borderColor: "#DBDBDB",
                      "&::before": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ArrowDropDown />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                      className="text-Black text-[16px] leading-5"
                      sx={{
                        minHeight: "fit-content",
                        "&.Mui-expanded": {
                          minHeight: "fit-content",
                        },
                      }}
                    >
                      {faq.title}
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        "&": {
                          padding: "0 16px",
                        },
                      }}
                      className="text-disable"
                    >
                      {faq.description}
                    </AccordionDetails>
                    <AccordionActions
                      sx={{
                        "&": {
                          padding: "12px 16px",
                        },
                      }}
                    >
                      <CustomButton
                        title={STRINGS.delete}
                        onClick={() => onPressDelete(faq)}
                        buttonType={"outline-gray-red"}
                      />
                      <CustomButton
                        title={STRINGS.edit}
                        onClick={() => onPressEditHandler(faq)}
                        buttonType={"primary-small"}
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
        setGlobalModalState={(state) => modalStateChangeHandler(state)}
        onAddFaqHandler={faqsAddHandler}
      />
      <ConfirmationDialog
        type={"delete"}
        onPressButton={deleteHandler}
        onClose={onPressClose}
        open={showDialog}
      />
    </>
  );
};

export default FaqTab;
