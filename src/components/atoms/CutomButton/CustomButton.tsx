import React from "react";

// import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import { Button } from "@mui/material";
import { ICustomButtonProps } from "./CustomButton.types";


const CustomButton: React.FC<ICustomButtonProps> = ({
  title,
  onClick,
  size,
  fullWidth,
  variant = "contained",
  icon,
}) => {
  return (
    <div>
      <Button
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        sx={{
          fontSize: "24px",
          lineHeight: "28px",
          fontWeight: "bold",
          textTransform: "capitalize",
          borderRadius: "4px",
          paddingY: "10px",
          backgroundColor: "primary",
          color: variant === "contained" ? "white" : "primary",
        }}
        onClick={onClick}
      >
        {icon}
        {title}
      </Button>
    </div>
  );
};

export default CustomButton;
