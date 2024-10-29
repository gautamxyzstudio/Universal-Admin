import React, { useEffect, useReducer, useState } from 'react';
import {
  ILinkClientFrom,
  ILinkOrAddClientFrom,
} from './LinkOrAddClientForm.types';
import FormDrawer from '@/components/molecules/DrawerTypes/FormDrawer/FormDrawer';
import { STRINGS } from '@/constant/en';
import { TextField } from '@mui/material';
import FormTextInput from '@/components/molecules/InputTypes/FormTextInput/FormTextInput';
import { CompanyStateFields } from '../AddCompanyForm/AddCompany.types';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';

const LinkOrAddClientFrom: React.FC<ILinkOrAddClientFrom> = ({
  show,
  setGlobalModalState,
  onPressLink,
  selectedClient,
}) => {
  const [displayFrom, setDisplayFrom] = useState(show);
  const initialState: ILinkClientFrom = {
    clientName: '',
    companyName: '',
    industry: '',
    email: '',
    contactNumber: '',
    location: '',
    clientNameError: '',
    companyNameError: '',
    industryError: '',
    emailError: '',
    contactNumberError: '',
    locationError: '',
  };

  const [state, setState] = useReducer(
    (prev: ILinkClientFrom, next: ILinkClientFrom) => ({ ...prev, ...next }),
    initialState
  );

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  useEffect(() => {
    if (selectedClient) {
      setState({
        ...state,
        clientName: selectedClient.name ?? '',
        companyName: selectedClient.companyName,
        industry: selectedClient.industry,
        email: selectedClient.email,
        contactNumber: selectedClient.phone ?? '',
        location: selectedClient.location,
      });
    }
  }, [selectedClient]);

  const onPressCross = () => {
    setDisplayFrom(false);
    setState(initialState);
    setGlobalModalState(false);
  };

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

  const onChangeTextField = (e: string, fieldName: string) => {
    setState({ ...state, [fieldName]: e, [`${fieldName}Error`]: '' });
  };

  return (
    <FormDrawer
      title={STRINGS.addClient}
      open={displayFrom}
      styles={{ width: 436 }}
      handleClose={handleClickOutside}
      onPressCross={onPressCross}
    >
      <div className="px-6 flex flex-1 flex-col gap-y-6 pt-6">
        <FormTextInput
          value={state.clientName}
          size="medium"
          onChange={(e) =>
            onChangeTextField(e.target.value, CompanyStateFields.clientName)
          }
          errorMessage={state.clientNameError}
          label={STRINGS.clientName}
        />
        <FormTextInput
          value={state.companyName}
          size="medium"
          onChange={(e) =>
            onChangeTextField(e.target.value, CompanyStateFields.companyName)
          }
          errorMessage={state.companyNameError}
          label={STRINGS.companyName}
        />
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
          value={state.contactNumber}
          size="medium"
          onChange={(e) =>
            onChangeTextField(e.target.value, CompanyStateFields.contactNumber)
          }
          errorMessage={state.contactNumberError}
          label={STRINGS.contactNumber}
        />
        <FormTextInput
          value={state.location}
          size="medium"
          onChange={(e) =>
            onChangeTextField(e.target.value, CompanyStateFields.location)
          }
          errorMessage={state.locationError}
          label={STRINGS.location}
        />
        <div
          onClick={onPressLink}
          className="cursor-pointer items-center gap-x-1 flex flex-row"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.1098 15.39L8.22984 19.27C7.76007 19.7234 7.1327 19.9767 6.47984 19.9767C5.82698 19.9767 5.1996 19.7234 4.72984 19.27C4.49944 19.0405 4.31663 18.7678 4.19189 18.4675C4.06715 18.1672 4.00294 17.8452 4.00294 17.52C4.00294 17.1948 4.06715 16.8728 4.19189 16.5725C4.31663 16.2722 4.49944 15.9995 4.72984 15.77L8.60984 11.89C8.79814 11.7017 8.90393 11.4463 8.90393 11.18C8.90393 10.9137 8.79814 10.6583 8.60984 10.47C8.42153 10.2817 8.16614 10.1759 7.89984 10.1759C7.63353 10.1759 7.37814 10.2817 7.18984 10.47L3.30984 14.36C2.52819 15.2108 2.10546 16.3307 2.12991 17.4858C2.15436 18.6408 2.62412 19.7418 3.44107 20.5588C4.25802 21.3757 5.359 21.8455 6.51408 21.8699C7.66917 21.8944 8.78904 21.4716 9.63984 20.69L13.5298 16.81C13.7181 16.6217 13.8239 16.3663 13.8239 16.1C13.8239 15.8337 13.7181 15.5783 13.5298 15.39C13.3415 15.2017 13.0861 15.0959 12.8198 15.0959C12.5535 15.0959 12.2981 15.2017 12.1098 15.39ZM20.6898 3.31C19.8486 2.47401 18.7108 2.00479 17.5248 2.00479C16.3389 2.00479 15.2011 2.47401 14.3598 3.31L10.4698 7.19C10.3766 7.28324 10.3026 7.39393 10.2522 7.51575C10.2017 7.63758 10.1757 7.76814 10.1757 7.9C10.1757 8.03186 10.2017 8.16243 10.2522 8.28425C10.3026 8.40607 10.3766 8.51676 10.4698 8.61C10.5631 8.70324 10.6738 8.7772 10.7956 8.82766C10.9174 8.87812 11.048 8.90409 11.1798 8.90409C11.3117 8.90409 11.4423 8.87812 11.5641 8.82766C11.6859 8.7772 11.7966 8.70324 11.8898 8.61L15.7698 4.73C16.2396 4.27663 16.867 4.02326 17.5198 4.02326C18.1727 4.02326 18.8001 4.27663 19.2698 4.73C19.5002 4.95949 19.683 5.23221 19.8078 5.53252C19.9325 5.83283 19.9967 6.15482 19.9967 6.48C19.9967 6.80519 19.9325 7.12717 19.8078 7.42748C19.683 7.72779 19.5002 8.00052 19.2698 8.23L15.3898 12.11C15.2961 12.203 15.2217 12.3136 15.1709 12.4354C15.1202 12.5573 15.094 12.688 15.094 12.82C15.094 12.952 15.1202 13.0827 15.1709 13.2046C15.2217 13.3264 15.2961 13.437 15.3898 13.53C15.4828 13.6237 15.5934 13.6981 15.7153 13.7489C15.8371 13.7997 15.9678 13.8258 16.0998 13.8258C16.2318 13.8258 16.3626 13.7997 16.4844 13.7489C16.6063 13.6981 16.7169 13.6237 16.8098 13.53L20.6898 9.64C21.5258 8.79878 21.995 7.66098 21.995 6.475C21.995 5.28903 21.5258 4.15122 20.6898 3.31ZM8.82984 15.17C8.92328 15.2627 9.03409 15.336 9.15593 15.3858C9.27777 15.4355 9.40823 15.4608 9.53984 15.46C9.67144 15.4608 9.80191 15.4355 9.92374 15.3858C10.0456 15.336 10.1564 15.2627 10.2498 15.17L15.1698 10.25C15.3581 10.0617 15.4639 9.8063 15.4639 9.54C15.4639 9.2737 15.3581 9.01831 15.1698 8.83C14.9815 8.6417 14.7261 8.53591 14.4598 8.53591C14.1935 8.53591 13.9381 8.6417 13.7498 8.83L8.82984 13.75C8.73611 13.843 8.66171 13.9536 8.61095 14.0754C8.56018 14.1973 8.53404 14.328 8.53404 14.46C8.53404 14.592 8.56018 14.7227 8.61095 14.8446C8.66171 14.9664 8.73611 15.077 8.82984 15.17Z"
              fill="#2A55FC"
            />
          </svg>
          <p className="text-xl text-externalLink">Link the company</p>
        </div>
      </div>
      <div className="bg-white px-6 pt-4 pb-6">
        <CustomButton
          fullWidth
          disabled={true}
          title={STRINGS.confirm}
          buttonType={'primary-small'}
          variant={'contained'}
          onClick={undefined}
        />
      </div>
    </FormDrawer>
  );
};

export default LinkOrAddClientFrom;
