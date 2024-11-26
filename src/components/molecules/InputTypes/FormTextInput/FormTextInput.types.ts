import { ICustomInputProps } from '@/components/atoms/CustomInput/CustomInput.types';

export interface IFormTextInputProps extends ICustomInputProps {
  value: string | number | undefined | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  label: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}
