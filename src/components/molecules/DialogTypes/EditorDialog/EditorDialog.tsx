import CustomDialog from "@/components/atoms/CustomDialog/CustomDialog";
import React, { useEffect, useState } from "react";
import { JobPostStateFields } from "../../../templates/JobPostEditForm/JobPostEditFrom.types";
import FroalaEditorComponent from "react-froala-wysiwyg";
// Import the Froala Editor Stylesheet for displaying content outside the editor
import "froala-editor/css/froala_style.min.css";
// Import the Froala Editor Stylesheet
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import { STRINGS } from "@/constant/en";
import { IEditorDialogProps } from "./EditorDialog.types";
const EditorDialog: React.FC<IEditorDialogProps> = ({
  open,
  onClose,
  data,
  fieldName,
  onClickBack,
  onClickUpdate,
}) => {
  const [editorData, setEditorData] = useState(data);

  useEffect(() => {
    setEditorData(data);
  }, [data]);

  const configFroala = {
    placeholderText: "Write here...",
    codeView: true,
    paragraphFormatSelection: true,
    charCounterCount: false,
    wordCounterCount: false,
    toolbarButtons: [
      "insertUnorderedList",
      "insertOrderedList",
      "|",
      "formatOL",
      "formatUL",
    ],
  };
  const handleModelChange = (e: string) => {
    setEditorData(e);
  };

  // Handle the update button click
  const handleUpdateClick = () => {
    if (onClickUpdate) {
      onClickUpdate(editorData, fieldName); // Pass updated data to the parent component
    }
  };

  return (
    <CustomDialog open={open} onClose={onClose}>
      <h3 className="text-2xl font-bold p-4">
        {fieldName === JobPostStateFields.JOB_DESCRIPTION
          ? STRINGS.jobDes
          : STRINGS.jobDuty}{" "}
        Preview
      </h3>
      <div className="px-4">
        <FroalaEditorComponent
          tag="textarea"
          config={configFroala}
          model={editorData}
          onModelChange={(e: string) => handleModelChange(e)}
        />
      </div>
      <div className="p-4 flex justify-between">
        <CustomButton
          title={STRINGS.update}
          onClick={handleUpdateClick}
          buttonType={"primary-small"}
        />
        <CustomButton
          title={"Back"}
          onClick={onClickBack}
          buttonType={"outline-primary-small"}
          variant="outlined"
        />
      </div>
    </CustomDialog>
  );
};

export default EditorDialog;
