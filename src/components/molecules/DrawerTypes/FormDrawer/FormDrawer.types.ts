import { SxProps, Theme } from "@mui/material";

export interface IFormDrawerProps {
  title: string;
  open: boolean;
  handleClose:
    | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  onPressCross: () => void;
  width?: string | number | null;
  children?: React.ReactNode | undefined;
  styles?: SxProps<Theme> | undefined;
}