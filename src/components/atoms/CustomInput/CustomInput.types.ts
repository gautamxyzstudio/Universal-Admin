import { InputProps as MuiInputProps } from "@mui/material";
export interface ICustomInputProps {
  label?: string | undefined;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute | undefined;
  error?: boolean;
  errorMessage?: string;
  InputProps?: MuiInputProps;
}
