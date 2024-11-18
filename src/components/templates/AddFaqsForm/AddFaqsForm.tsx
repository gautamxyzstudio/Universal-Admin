import FormDrawer from "@/components/molecules/DrawerTypes/FormDrawer/FormDrawer";
import React, { useEffect, useReducer } from "react";
import {
  FaqsStateFields,
  IAddFaqsFormProps,
  IAddFaqsState,
} from "./AddFaqsForm.types";
import { STRINGS } from "@/constant/en";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import FormTextInput from "@/components/molecules/InputTypes/FormTextInput/FormTextInput";
import {
  useAddFaqMutation,
  useEditFaqMutation,
} from "@/api/fetures/FAQs/FAQsApi";
import { useShowLoaderContext } from "@/contexts/LoaderContext/LoaderContext";
import { useSnackBarContext } from "@/providers/SnackbarProvider";
import { ICustomErrorResponse } from "@/api/types";

const AddFaqsForm: React.FC<IAddFaqsFormProps> = ({
  show,
  setGlobalModalState,
  currentSelectFaq,
  onAddFaqHandler,
}) => {
  const [displayFrom, setDisplayFrom] = React.useState(show);
  const [addFaq] = useAddFaqMutation();
  const [editFaq] = useEditFaqMutation();
  const { changeLoaderState } = useShowLoaderContext();
  const { displaySnackbar } = useSnackBarContext();
  const initialState = {
    faqTitle: "",
    faqDescription: "",
    faqTitleError: "",
    faqDescriptionError: "",
  };

  const [state, setState] = useReducer(
    (prev: IAddFaqsState, next: IAddFaqsState) => ({ ...prev, ...next }),
    initialState
  );

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  useEffect(() => {
    if (
      currentSelectFaq &&
      currentSelectFaq?.description &&
      currentSelectFaq.title
    ) {
      setState({
        ...state,
        faqTitle: currentSelectFaq.title,
        faqDescription: currentSelectFaq.description,
      });
    }
  }, [currentSelectFaq]);

  // press on cross button
  const onPressCross = () => {
    setDisplayFrom(false);
    setGlobalModalState(false);
    setState(initialState);
  };

  const handleClickOutside = (
    event: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason == "backdropClick") {
      return;
    }
    setDisplayFrom(false);
    setGlobalModalState(false);
  };

  const onPressCreate = async () => {
    try {
      changeLoaderState(true);
      onPressCross();
      const addFaqRes = await addFaq({
        data: {
          FaqDsrc: state.faqDescription,
          Title: state.faqTitle,
        },
      }).unwrap();
      if (addFaqRes) {
        onAddFaqHandler({
          id: addFaqRes.data.id,
          description: addFaqRes.data.attributes.FaqDsrc,
          title: addFaqRes.data.attributes.Title,
        });
        displaySnackbar("success", "FAQs created successfully");
      }
    } catch (err) {
      const error = err as ICustomErrorResponse;
      displaySnackbar("error", error.message);
    } finally {
      changeLoaderState(false);
    }
  };

  const onPressUpdate = async () => {
    if (currentSelectFaq) {
      const { id } = currentSelectFaq;
      if (id) {
        try {
          changeLoaderState(true);
          onPressCross();
          const editFaqRes = await editFaq({
            faqDetails: {
              data: {
                FaqDsrc: state.faqDescription,
                Title: state.faqTitle,
              },
            },
            faqId: id,
          }).unwrap();
          if (editFaqRes) {
            onAddFaqHandler({
              id,
              description: state.faqDescription,
              title: state.faqTitle,
            });
            displaySnackbar("success", "FAQs updated successfully");
          }
        } catch (err) {
          const error = err as ICustomErrorResponse;
          displaySnackbar("error", error.message);
        } finally {
          changeLoaderState(false);
        }
      } else {
        displaySnackbar("error", "FAQs not found");
      }
    }
  };

  const onChangeTextField = (e: string, fieldName: string) => {
    setState({ ...state, [fieldName]: e, [`${fieldName}Error`]: "" });
  };
  return (
    <FormDrawer
      styles={{ width: "28%" }}
      title={STRINGS.faqs}
      open={displayFrom}
      handleClose={handleClickOutside}
      onPressCross={onPressCross}
    >
      <div className="p-6 flex w-full flex-col gap-y-6">
        <FormTextInput
          value={state.faqTitle}
          onChange={(e) =>
            onChangeTextField(e.target.value, FaqsStateFields.FAQ_TITLE)
          }
          errorMessage={state.faqTitleError}
          label={"Question"}
        />
        <FormTextInput
          value={state.faqDescription}
          onChange={(e) =>
            onChangeTextField(e.target.value, FaqsStateFields.FAQ_DESCRIPTION)
          }
          errorMessage={state.faqDescriptionError}
          label={"Shot answer"}
          multiline
        />
      </div>
      <div className="px-6">
        <CustomButton
          title={currentSelectFaq ? STRINGS.update : STRINGS.create}
          onClick={currentSelectFaq ? onPressUpdate : onPressCreate}
          fullWidth
          buttonType={"primary-small"}
        />
        <div className="mt-2 h-1" />
      </div>
    </FormDrawer>
  );
};

export default AddFaqsForm;
