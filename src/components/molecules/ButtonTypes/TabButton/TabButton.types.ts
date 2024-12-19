import { Theme } from "@emotion/react";
import { ListItemButtonBaseProps, SxProps } from "@mui/material";
import React from "react";

export interface ITabButtonProps extends ListItemButtonBaseProps {
  isSelected: boolean;
  onPressButton?: () => void | undefined;
  content?: React.ReactNode;
  title?: string;
  customButtonStyle?: SxProps<Theme>
}
