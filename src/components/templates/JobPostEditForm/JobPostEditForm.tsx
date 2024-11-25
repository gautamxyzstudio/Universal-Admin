import React, { useEffect, useState } from "react";
import { IJobPostEditFromProps } from "./index.types";
import FormDrawer from "@/components/molecules/DrawerTypes/FormDrawer/FormDrawer";
import { STRINGS } from "@/constant/en";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import FormTextInput from "@/components/molecules/InputTypes/FormTextInput/FormTextInput";
import EditorDialog from "./EditorDialog";
import { IJobPostTypes } from "@/api/fetures/Company/Company.types";

const JobPostEditForm: React.FC<IJobPostEditFromProps> = ({
  show,
  setGlobalModalState,
  currentPost,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const [showEditorDialog, setShowEditorDialog] = useState<boolean>(false);
  const [editData, setEditData] = useState<string>("");
  const [currentPostData, setCurrentPostData] = useState<IJobPostTypes | null>(null);
  

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  useEffect(() => {
    if (currentPost) {
      setCurrentPostData(currentPost);
    }
  }, [currentPost]);

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
  const onPressCross = () => {
    setDisplayFrom(false);
    setGlobalModalState(false);
  };
  const onPressSave = () => {
    setDisplayFrom(false);
    setGlobalModalState(false);
  };

  // Triggered when job description is clicked to edit
  const OnClickJobDescription = (data: string) => {
    setEditData(data);
    setShowEditorDialog(true);
  };

  // Function to close the editor dialog
  const handleClickBack = () => {
    setShowEditorDialog(false);
  };

  // Function to handle updated data from the editor dialog
  const handleUpdateData = (updatedData: string) => {
    console.log("Updated Description:", updatedData);
    setEditData(updatedData);
    setShowEditorDialog(false);
  };
  return (
    <>
      <FormDrawer
        title={STRINGS.edit}
        open={displayFrom}
        handleClose={handleClickOutside}
        onPressCross={onPressCross}
        styles={{
          width: "30%",
        }}
      >
        <div className="p-6 flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-6">
            <h2 className="text-accentColor text-base">{STRINGS.details}</h2>
            <FormTextInput
              value={currentPostData?.job_name}
              onChange={(e) => e.target.value}
              errorMessage={""}
              label={STRINGS.jobName}
            />
            <div className="border border-textFieldBorder rounded-lg py-[16.5px] px-[14px] relative cursor-pointer">
              <div
                className="cursor-pointer"
                onClick={() =>
                  OnClickJobDescription(
                    currentPost?.description || "<div>Data</div>"
                  )
                }
                dangerouslySetInnerHTML={{
                  __html:
                    currentPostData?.description.slice(0, 30) + "...Read more" ||
                    "",
                }}
              />
              <span className="absolute -top-[13px] left-[9px] bg-white text-xs text-disable p-[5px]">
                {STRINGS.jobDes}
              </span>
            </div>
            <div className="border border-textFieldBorder rounded-lg py-[16.5px] px-[14px] relative cursor-pointer">
              <div
                className="cursor-pointer"
                onClick={() =>
                  OnClickJobDescription(
                    currentPostData?.jobDuties || "<div>Data</div>"
                  )
                }
                dangerouslySetInnerHTML={{
                  __html:
                    currentPost?.jobDuties.slice(0, 30) + "...Read more" || "",
                }}
              />
              <span className="absolute -top-[13px] left-[9px] bg-white text-xs text-disable p-[5px]">
                {STRINGS.jobDuty}
              </span>
            </div>
         
          </div>
          <div className="flex fle-col gap-y-3">
            <h2 className="text-accentColor text-base">{STRINGS.general}</h2>
          </div>
          <div className="flex fle-col gap-y-3">
            <h2 className="text-accentColor text-base">
              {STRINGS.requirement}
            </h2>
          </div>
        </div>
        <div className="px-6">
          <CustomButton
            title={STRINGS.save}
            onClick={onPressSave}
            fullWidth
            buttonType={"primary-small"}
          />
          <div className="mt-2 h-1" />
        </div>
      </FormDrawer>
      <EditorDialog
        data={editData}
        open={showEditorDialog}
        onClose={() => setShowEditorDialog(false)}
        onClickBack={handleClickBack}
        onClickUpdate={handleUpdateData}
      />
    </>
  );
};

export default JobPostEditForm;
