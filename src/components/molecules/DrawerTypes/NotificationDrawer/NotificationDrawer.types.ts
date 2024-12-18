import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export interface INotificationDrawerProps{
      open: boolean;
      handleClose:
        | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
        | undefined;
      onPressCross: () => void;
      styles?: SxProps<Theme> | undefined;
}