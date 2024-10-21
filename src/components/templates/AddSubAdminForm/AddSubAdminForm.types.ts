import {
  ISubAdmin,
  IUpdateSubAdminRequestBody,
} from '@/api/fetures/SubAdmin/SubAdminApi.types';
import { IDynamicFormField } from '@/components/organism/AddNewForm/AddNewForm.types';
import { STRINGS } from '@/constant/en';
import { IFieldTypes } from '@/constant/enums';
import { extractFirstAndLastNameFromName } from '@/utility/cookies';

export type IAddSubAdminFormProps = {
  show: boolean;
  setGlobalModalState: (state: boolean) => void;
  subAdmin: ISubAdmin | null;
  data: IDynamicFormField[];
};

export enum ApiKeys {
  NAME = 'UserNameFL',
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

export const createPayloadFromUpdateProperties = (
  updatedProperties: object,
  admin: ISubAdmin
): IUpdateSubAdminRequestBody | null => {
  const { firstName, lastName, status, phoneNumber } = updatedProperties as {
    firstName?: string;
    lastName?: string;
    status?: string;
    phoneNumber?: string;
  };

  const payload: IUpdateSubAdminRequestBody = {
    subAdminId: admin.id,
    body: {},
  };

  if (firstName || lastName) {
    const currentName = extractFirstAndLastNameFromName(admin.UserNameFL);
    const newFirstName = firstName ?? currentName.firstName;
    const newLastName = lastName ?? currentName.lastName;

    payload.body.UserNameFL = `${newFirstName} ${newLastName}`;
  }

  // Handle status update
  if (status !== undefined) {
    payload.body.UserStatus = status === 'true';
  }

  // Handle phone number update
  if (phoneNumber) {
    payload.body.phoneNumber = phoneNumber;
  }

  // Check if any updates were made
  if (Object.keys(payload.body).length === 0) {
    return null;
  }

  return payload;
};
