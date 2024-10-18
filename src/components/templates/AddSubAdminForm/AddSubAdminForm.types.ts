import { IDynamicFormField } from '@/components/organism/AddNewForm/AddNewForm.types';
import { STRINGS } from '@/constant/en';
import { IFieldTypes } from '@/constant/enums';

export type IAddSubAdminFormProps = {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  data: IDynamicFormField[];
};

export enum ApiKeys {
  NAME = 'name',
  EMAIL = 'email',
  phoneNumber = 'phoneNumber',
  password = 'password',
}

export const addNewSubAdminData: IDynamicFormField[] = [
  {
    id: 1,
    displayName: STRINGS.name,
    apiKey: ApiKeys.NAME,
    type: IFieldTypes.SIMPLE,
    value: '',
  },
  {
    id: 2,
    displayName: STRINGS.email,
    apiKey: ApiKeys.EMAIL,
    type: IFieldTypes.EMAIL,
    value: '',
  },
  {
    id: 3,
    displayName: STRINGS.contactNumber,
    apiKey: ApiKeys.phoneNumber,
    type: IFieldTypes.MOBILE,
    value: '',
  },
  {
    id: 4,
    displayName: STRINGS.password,
    apiKey: ApiKeys.password,
    type: IFieldTypes.PASSWORD,
    value: '',
  },
  {
    id: 5,
    displayName: STRINGS.status,
    apiKey: 'status',
    type: IFieldTypes.STATUS,
    value: 'true',
  },
];

export type IAddNewSubAdminFields = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  status: 'true' | 'false';
};
