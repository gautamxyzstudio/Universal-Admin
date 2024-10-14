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
}) => {
  return (
    <div>
      {/* <Input
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="lg"
        color="white"
        className="text-md"
        type={type}
        containerProps={{
          className: 'bg-pink',
        }}
        error={error}
        variant="outlined"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        
      /> */}

      <TextField
        className="text-disable"
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        fullWidth
        variant="outlined"
         color="secondary"
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputBase-root": {
            border: "1px solid",
            borderRadius: "8px",
            borderColor: error? "red" : "white",
          },
          "& .MuiFormLabel-root.MuiInputLabel-root":{
            color: error? "red" : "white",
          }
        
        }}
      />

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
