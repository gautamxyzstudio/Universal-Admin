import { IDynamicFormField } from '@/components/organism/AddNewForm/AddNewForm.types';
import { STRINGS } from '@/constant/en';
import { IFieldTypes } from '@/constant/enums';

export type IAddClientForm = {
  setGlobalModalState: (value: boolean) => void;
  show: boolean;
};

export const IAddNewClientDataFields: IDynamicFormField[] = [
  {
    id: 1,
    displayName: STRINGS.name,
    apiKey: 'name',
    type: IFieldTypes.SIMPLE,
    value: '',
  },
  {
    id: 2,
    displayName: STRINGS.companyName,
    apiKey: 'companyName',
    type: IFieldTypes.SIMPLE,
    value: '',
  },
  {
    id: 3,
    displayName: STRINGS.email,
    apiKey: 'email',
    type: IFieldTypes.EMAIL,
    value: '',
  },
  {
    id: 4,
    displayName: STRINGS.contactNumber,
    apiKey: 'phone',
    type: IFieldTypes.MOBILE,
    value: '',
  },
  {
    id: 4,
    displayName: STRINGS.password,
    apiKey: 'password',
    type: IFieldTypes.PASSWORD,
    value: '',
  },
  {
    id: 5,
    displayName: STRINGS.status,
    apiKey: 'status',
    type: IFieldTypes.STATUS,
    value: '',
  },
];
