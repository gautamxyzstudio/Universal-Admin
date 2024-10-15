import { ButtonProps } from "@mui/material";
export interface ICustomButtonProps extends ButtonProps  {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean | undefined;
  size?: "small" | "large" | "medium";
  variant?: "contained" | "outlined";
  icon? : React.ReactNode;
} 
