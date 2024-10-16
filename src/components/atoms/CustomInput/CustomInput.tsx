import React from "react";
import { ICustomInputProps } from "./CustomInput.types";
import { TextField } from "@mui/material";

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  type,
  value,
  error,
  errorMessage,
  onChange,
  ...props
}) => {
  return (
    <>
      <TextField
        {...props}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        variant="outlined"
      ></TextField>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default CustomInput;
