/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from "react";
import {
  IEditJobPostState,
  IJobPostEditFromProps,
  JobPostStateFields,
} from "./index.types";
import FormDrawer from "@/components/molecules/DrawerTypes/FormDrawer/FormDrawer";
import { STRINGS } from "@/constant/en";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import FormTextInput from "@/components/molecules/InputTypes/FormTextInput/FormTextInput";
import EditorDialog from "./EditorDialog";
import { IJobTypesEnum } from "@/constant/enums";
import { getJobType } from "@/constant/constant";
import CustomSelectInput from "@/components/molecules/InputTypes/SelectInput/CustomSelectInput";
import DatePickerComponent from "./DatePickerComponent";
import dayjs from "dayjs";
import TimePickerComponent from "./TimePickerComponent";

const JobPostEditForm: React.FC<IJobPostEditFromProps> = ({
  show,
  setGlobalModalState,
  currentPost,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const [showEditorDialog, setShowEditorDialog] = useState<boolean>(false);
  const [editData, setEditData] = useState<string>("");

  const initialState = {
    jobName: "",
    jobDescription: "",
    jobDuties: "",
    jobType: "",
    eventDate: "",
    startShift: "",
    endShift: "",
    location: "",
    address: "",
    city: "",
    postalCode: "",
    requiredEmployee: "",
    salary: "",
    requiredCertificates: "",
    gender: "",
    jobNameError: "",
    jobDescriptionError: "",
    jobDutiesError: "",
    jobTypeError: "",
    eventDateError: "",
    startShiftError: "",
    endShiftError: "",
    locationError: "",
    addressError: "",
    cityError: "",
    postalCodeError: "",
    requiredEmployeeError: "",
    salaryError: "",
    requiredCertificatesError: "",
    genderError: "",
  };

  const [state, setState] = useReducer(
    (prev: IEditJobPostState, next: IEditJobPostState) => ({
      ...prev,
      ...next,
    }),
    initialState
  );

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  useEffect(() => {
    if (currentPost) {
      setState({
        ...state,
        jobName: currentPost.job_name,
        jobDescription: currentPost.description,
        jobDuties: currentPost.jobDuties,
        jobType: currentPost.job_type,
        eventDate: currentPost.eventDate,
        startShift: currentPost.startShift,
        endShift: currentPost.endShift,
        location: currentPost.location,
        address: currentPost.address,
        city: currentPost.city,
        postalCode: currentPost.postalCode,
        requiredEmployee: currentPost.requiredEmployee
          ? currentPost.requiredEmployee.toLocaleString()
          : "",
        salary: currentPost.salary,
        requiredCertificates: currentPost.required_certificates
          ? currentPost.required_certificates
          : "",
        gender: currentPost.gender,
      });
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
  const onPressEditCross = () => {
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

  // Text field
  const onChangeTextField = (e: string, fieldName: string) => {
    setState({ ...state, [fieldName]: e, [`${fieldName}Error`]: "" });
  };

  // Date and time fields
  const onChangeDateTimeField = (
    newValue: dayjs.Dayjs | null,
    fieldName: string
  ) => {
    setState({ ...state, [fieldName]: newValue, [`${fieldName}Error`]: "" });
  };
  return (
    <>
      <FormDrawer
        title={STRINGS.edit}
        open={displayFrom}
        handleClose={handleClickOutside}
        onPressCross={onPressEditCross}
        styles={{
          width: "30%",
        }}
      >
        <div className="h-[90vh] overflow-scroll scrollbar-none">
          <div className="px-6 pt-4 pb-6 flex h-[95%] overflow-scroll flex-col gap-y-4  scrollbar-none">
            {/* Details section */}
            <div className="flex flex-col gap-y-6">
              <h2 className="text-accentColor text-base">{STRINGS.details}</h2>
              <FormTextInput
                value={state.jobName}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.JOB_NAME)
                }
                errorMessage={""}
                label={STRINGS.jobName}
              />
              {/* Job descriptions */}
              <div className="border border-textFieldBorder rounded-lg py-[16.5px] px-[14px] relative cursor-pointer">
                <div
                  className="cursor-pointer"
                  onClick={() => OnClickJobDescription(state.jobDescription)}
                  
                  dangerouslySetInnerHTML={{
                    __html: state.jobDescription.slice(0, 30) + "...Read more",
                  }}
                />
                <span className="absolute -top-[13px] left-[9px] bg-white text-xs text-disable p-[5px]">
                  {STRINGS.jobDes}
                </span>
              </div>
              {/* Job Duties */}
              <div className="border border-textFieldBorder rounded-lg py-[16.5px] px-[14px] relative cursor-pointer">
                <div
                  className="cursor-pointer"
                  onClick={() => OnClickJobDescription(state.jobDuties)}
                  dangerouslySetInnerHTML={{
                    __html: state.jobDuties + "...Read more" || "",
                  }}
                />
                <span className="absolute -top-[13px] left-[9px] bg-white text-xs text-disable p-[5px]">
                  {STRINGS.jobDuty}
                </span>
              </div>
              <CustomSelectInput
                label={STRINGS.jobType}
                value={state.jobType}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.JOB_TYPE)
                }
                menuItem={jobTypeSelection}
              />
            </div>
            {/* General section */}
            <div className="flex flex-col gap-y-6">
              <h2 className="text-accentColor text-base">{STRINGS.general}</h2>
              {/* Date Picker Component */}
              <DatePickerComponent
                label={STRINGS.eventDate}
                value={state.eventDate}
                onChange={(e) =>
                  onChangeDateTimeField(e, JobPostStateFields.EVENT_DATE)
                }
              />
              {/* Time Picker Component */}
              <div className="flex gap-x-4">
                <TimePickerComponent
                  label={STRINGS.startShift}
                  value={state.startShift}
                  onChange={(e) =>
                    onChangeDateTimeField(e, JobPostStateFields.START_SHIFT)
                  }
                />
                <TimePickerComponent
                  label={STRINGS.endShift}
                  value={state.endShift}
                  onChange={(e) =>
                    onChangeDateTimeField(e, JobPostStateFields.END_SHIFT)
                  }
                />
              </div>
              <FormTextInput
                value={state.location}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.LOCATION)
                }
                errorMessage={""}
                label={STRINGS.location}
              />
              <FormTextInput
                value={state.address}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.ADDRESS)
                }
                errorMessage={""}
                label={STRINGS.address}
              />
              <FormTextInput
                value={state.city}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.CITY)
                }
                errorMessage={""}
                label={STRINGS.city}
              />
              <FormTextInput
                value={state.postalCode}
                onChange={(e) =>
                  onChangeTextField(
                    e.target.value,
                    JobPostStateFields.POSTAL_CODE
                  )
                }
                errorMessage={""}
                label={STRINGS.postalCode}
              />
            </div>

            {/* Requirement section */}
            <div className="flex flex-col gap-y-6">
              <h2 className="text-accentColor text-base">
                {STRINGS.requirement}
              </h2>
              <FormTextInput
                value={state.requiredEmployee}
                onChange={(e) =>
                  onChangeTextField(
                    e.target.value,
                    JobPostStateFields.REQUIRED_EMPLOYEE
                  )
                }
                errorMessage={""}
                label={STRINGS.num_of_employees}
              />
              <FormTextInput
                value={state.salary + "$"}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.SALARY)
                }
                errorMessage={""}
                label={STRINGS.wagePerHour}
              />
              <CustomSelectInput
                label={STRINGS.gender + " (optional)"}
                value={state.gender}
                onChange={(e) =>
                  onChangeTextField(e.target.value, JobPostStateFields.GENDER)
                }
                menuItem={genderPreferences}
              />
            </div>
          </div>
        </div>
        <div className="px-6 pt-4 z-10 fixed w-[30%] bg-white bottom-0 shadow-custom-shadow">
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

// job type selection
export const jobTypeSelection = [
  {
    itemLabel: getJobType(IJobTypesEnum.EVENT),
    itemValue: IJobTypesEnum.EVENT,
  },
  {
    itemLabel: getJobType(IJobTypesEnum.STATIC),
    itemValue: IJobTypesEnum.STATIC,
  },
];
// gender preference selection
export const genderPreferences = [
  { itemLabel: "Male", itemValue: "Male" },
  { itemLabel: "Female", itemValue: "Female" },
  { itemLabel: "No Preference", itemValue: "No Preference" },
  { itemLabel: "Other", itemValue: "Other" },
];
