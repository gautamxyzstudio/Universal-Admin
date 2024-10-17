import { IFormDialogProps } from '@/components/molecules/DialogTypes/FormDialog/FormDialog.types';

import { IFieldTypes } from '@/constant/enums';

export interface IAddNewFromProps extends IFormDialogProps {
  data: IDynamicFormField[];
  onPressSubmit: (formData: { [key: string]: any }) => void;
}

export type IDynamicFormField = {
  id: number;
  displayName: string;
  apiKey: string;
  type: IFieldTypes;
  value: string;
};
