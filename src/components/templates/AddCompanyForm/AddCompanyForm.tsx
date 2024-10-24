import { STRINGS } from '@/constant/en';
import React, { useEffect, useReducer, useState } from 'react';
import {
  CompanyStateFields,
  IAddCompanyFormProps,
  IAddCompanyState,
} from './AddCompany.types';
import FormDialog from '@/components/molecules/DialogTypes/FormDialog/FormDialog';
import PhotoUpload from '@/components/atoms/PhotoUpload/PhotoUpload';
import FormTextInput from '@/components/molecules/InputTypes/FormTextInput/FormTextInput';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';

const AddCompanyForm: React.FC<IAddCompanyFormProps> = ({
  show,
  setGlobalModalState,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const [state, setState] = useReducer(
    (prev: IAddCompanyState, next: IAddCompanyState) => ({ ...prev, ...next }),
    {
      logo: null,
      companyName: '',
      accRequestName: '',
      industry: '',
      email: '',
      contactNumber: '',
      address: '',
      companyRegistrationNumber: '',
      gstNumber: '',
      websiteName: '',
      companyNameError: '',
      accRequestNameError: '',
      industryError: '',
      emailError: '',
      contactNumberError: '',
      addressError: '',
      companyRegistrationNumberError: '',
      gstNumberError: '',
    }
  );

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  const handleClickOutside = (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason == 'backdropClick') {
      return;
    }
    setDisplayFrom(false);
    setGlobalModalState(false);
  };

  const onPressCross = () => {
    setDisplayFrom(false);
    setGlobalModalState(false);
  };

  const onChangeTextField = (e: string, fieldName: string) => {
    setState({ ...state, [fieldName]: e, [`${fieldName}Error`]: '' });
  };

  return (
    <FormDialog
      width={824}
      onPressCross={onPressCross}
      title={STRINGS.addCompany}
      open={displayFrom}
      handleClose={handleClickOutside}
    >
      <div className="flex flex-col  items-center">
        <PhotoUpload
          getUploadedImageId={(id) =>
            onChangeTextField(id.toString(), CompanyStateFields.logo)
          }
        />
      </div>
      <div className="mt-4">
        <h1 className="text-accentColor mb-4 text-md">
          {STRINGS.personalInformation}
        </h1>
        <div className="w-full flex gap-x-8 flex-row justify-between items-center ">
          <div className="flex w-full flex-col gap-y-6">
            <FormTextInput
              value={state.companyName}
              size="medium"
              onChange={(e) =>
                onChangeTextField(
                  e.target.value,
                  CompanyStateFields.companyName
                )
              }
              errorMessage={state.companyNameError}
              label={STRINGS.companyName}
            />
            <FormTextInput
              value={state.accRequestName}
              size="medium"
              onChange={(e) =>
                onChangeTextField(
                  e.target.value,
                  CompanyStateFields.accRequestName
                )
              }
              errorMessage={state.accRequestNameError}
              label={STRINGS.accountRequestName}
            />
            <FormTextInput
              value={state.contactNumber}
              size="medium"
              onChange={(e) =>
                onChangeTextField(
                  e.target.value,
                  CompanyStateFields.contactNumber
                )
              }
              errorMessage={state.contactNumberError}
              label={STRINGS.contactNumber}
            />
          </div>
          <div className="flex  w-full  flex-col gap-y-6">
            <FormTextInput
              value={state.industry}
              size="medium"
              onChange={(e) =>
                onChangeTextField(e.target.value, CompanyStateFields.industry)
              }
              errorMessage={state.industryError}
              label={STRINGS.industry}
            />
            <FormTextInput
              value={state.email}
              size="medium"
              onChange={(e) =>
                onChangeTextField(e.target.value, CompanyStateFields.email)
              }
              errorMessage={state.emailError}
              label={STRINGS.email}
            />
            <FormTextInput
              value={state.address}
              size="medium"
              onChange={(e) =>
                onChangeTextField(e.target.value, CompanyStateFields.address)
              }
              errorMessage={state.addressError}
              label={STRINGS.address}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className=" text-accentColor mb-4 text-md">
          {STRINGS.otherInformation}
        </h1>
        <div className="w-full flex gap-x-8 flex-row justify-between  ">
          <div className="flex w-full flex-col gap-y-4">
            <FormTextInput
              value={state.companyRegistrationNumber}
              size="medium"
              onChange={(e) =>
                onChangeTextField(
                  e.target.value,
                  CompanyStateFields.companyRegistrationNumber
                )
              }
              errorMessage={state.companyRegistrationNumberError}
              label={STRINGS.companyRegisteredNumber}
            />
            <FormTextInput
              value={state.websiteName}
              size="medium"
              onChange={(e) =>
                onChangeTextField(
                  e.target.value,
                  CompanyStateFields.websiteName
                )
              }
              errorMessage={''}
              label={STRINGS.websiteLink}
            />
          </div>
          <div className="flex  w-full  flex-col gap-y-4">
            <FormTextInput
              value={state.gstNumber}
              size="medium"
              onChange={(e) =>
                onChangeTextField(e.target.value, CompanyStateFields.gstNumber)
              }
              errorMessage={state.gstNumberError}
              label={STRINGS.gstHSTNumber}
            />
          </div>
        </div>
      </div>
      <div className="mt-8" />
      <CustomButton
        title={STRINGS.create}
        onClick={undefined}
        style={{ width: 156 }}
        buttonType={'primary-small'}
      />
    </FormDialog>
  );
};

export default AddCompanyForm;
