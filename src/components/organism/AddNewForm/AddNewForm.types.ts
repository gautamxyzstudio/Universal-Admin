import { IFormDrawerProps } from '@/components/molecules/DrawerTypes/FormDrawer/FormDrawer.types';

import { IFieldTypes } from '@/constant/enums';

export interface IAddNewFromProps extends IFormDrawerProps {
  data: IDynamicFormField[];
  onPressSubmit: (formData: { [key: string] : string }) => void;
  buttonTitle?: string;
  isValid: boolean;
}

export type IDynamicFormField = {
  id: number;
  displayName: string;
  apiKey: string;
  type: IFieldTypes;
  value: string;
};
