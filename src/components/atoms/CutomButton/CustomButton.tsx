import React from "react";
// import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import { Button } from "@mui/material";
import { ICustomButtonProps } from "./CustomButton.types";

const CustomButton: React.FC<ICustomButtonProps> = ({
  title,
  onClick,
  size,
  variant = "contained",
  icon,
  ...props
}) => {
  return (
    <div>
      <Button variant={variant} size={size} onClick={onClick} {...props}>
        {icon}
        {title}
      </Button>
    </div>
  );
};

export default CustomButton;
