import { TextFieldProps } from '@mui/material';
export interface ICustomInputProps extends Omit<TextFieldProps, 'InputProps'> {
  label?: string | undefined;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute | undefined;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number | undefined;
  variant?: 'outlined' | 'standard' | 'filled'
}
