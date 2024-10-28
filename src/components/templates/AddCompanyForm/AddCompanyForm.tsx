import { STRINGS } from '@/constant/en';
import React, { useEffect, useReducer, useState } from 'react';
import {
  CompanyStateFields,
  IAddCompanyFormProps,
  IAddCompanyState,
} from './AddCompany.types';
import PhotoUpload from '@/components/atoms/PhotoUpload/PhotoUpload';
import FormTextInput from '@/components/molecules/InputTypes/FormTextInput/FormTextInput';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { validateEmail, validatePhoneNumber } from '@/utility/utils';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import { useAddCompanyMutation } from '@/api/fetures/Company/CompanyApi';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { ICustomErrorResponse } from '@/api/types';
import FormDrawer from '@/components/molecules/DrawerTypes/FormDrawer/FormDrawer';

const AddCompanyForm: React.FC<IAddCompanyFormProps> = ({
  show,
  onAddCompanyHandler,
  setGlobalModalState,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const [addCompany] = useAddCompanyMutation();
  const { displaySnackbar } = useSnackBarContext();
  const { changeLoaderState } = useShowLoaderContext();

  const initialState = {
    logo: '',
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
  };
  const [state, setState] = useReducer(
    (prev: IAddCompanyState, next: IAddCompanyState) => ({ ...prev, ...next }),
    initialState
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
    setState(initialState);
  };

  const onChangeTextField = (e: string, fieldName: string) => {
    setState({ ...state, [fieldName]: e, [`${fieldName}Error`]: '' });
  };

  const onPressCreate = async () => {
    let isValid = true;
    const cName = state.companyName.trim();
    const industry = state.industry.trim();
    const accReqName = state.accRequestName.trim();
    const email = state.email.trim();
    const phoneNumber = state.contactNumber.trim();
    const address = state.address.trim();
    const companyRegistrationNumber = state.companyRegistrationNumber.trim();
    const gstNumber = state.gstNumber.trim();
    const websiteName = state.websiteName.trim();
    if (!cName) {
      isValid = false;
      setState({ ...state, companyNameError: STRINGS.required_field });
    }
    if (!industry) {
      isValid = false;
      setState({ ...state, industryError: STRINGS.required_field });
    }
    if (!accReqName) {
      isValid = false;
      setState({ ...state, accRequestNameError: STRINGS.required_field });
    }
    if (!email) {
      isValid = false;
      setState({ ...state, emailError: STRINGS.required_field });
    }
    if (!validateEmail(email)) {
      isValid = false;
      setState({ ...state, emailError: STRINGS.valid_email });
    }
    if (!phoneNumber) {
      isValid = false;
      setState({ ...state, contactNumberError: STRINGS.required_field });
    }
    if (!validatePhoneNumber(phoneNumber)) {
      isValid = false;
      setState({ ...state, contactNumberError: STRINGS.valid_phone_number });
    }
    if (!address) {
      isValid = false;
      setState({ ...state, addressError: STRINGS.required_field });
    }
    if (!companyRegistrationNumber) {
      isValid = false;
      setState({
        ...state,
        companyRegistrationNumberError: STRINGS.required_field,
      });
    }
    if (isValid) {
      try {
        changeLoaderState(true);
        onPressCross();
        const addCompRes = await addCompany({
          data: {
            companyname: cName,
            companylogo: state.logo,
            companyemail: email,
            location: accReqName,
            contactno: phoneNumber,
            address: address,
            Industry: industry,
            Website: websiteName,
            regNo: companyRegistrationNumber,
            gstNo: gstNumber,
          },
        }).unwrap();
        if (addCompRes) {
          onAddCompanyHandler({
            companyname: addCompRes.data?.attributes.companyname,
            id: addCompRes.data.id,
            sNum: addCompRes.data.id,
            companyemail: addCompRes.data?.attributes?.companyemail,
            location: addCompRes.data?.attributes?.location,
            contactno: addCompRes.data?.attributes?.contactno,
            address: addCompRes.data?.attributes?.address,
            companylogo: undefined,
            Industry: addCompRes.data?.attributes?.regNo,
            Website: addCompRes.data?.attributes?.Website,
            regNo: addCompRes.data?.attributes?.regNo,
            gstNo: addCompRes.data?.attributes?.gstNo,
          });
          displaySnackbar('success', 'Company created successfully');
        }
      } catch (err) {
        const error = err as ICustomErrorResponse;
        displaySnackbar('error', error.message);
      } finally {
        changeLoaderState(false);
      }
    }
  };

  return (
    <FormDrawer
      onPressCross={onPressCross}
      title={STRINGS.addCompany}
      open={displayFrom}
      handleClose={handleClickOutside}
    ><div>
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
      </div></div>
      {/* <div className="mt-8" /> */}
      <CustomButton
        title={STRINGS.create}
        onClick={onPressCreate}
        // style={{ width: 156 }}
        fullWidth
        buttonType={'primary-small'}
      />
    </FormDrawer>
  );
};

export default AddCompanyForm;
