import React from 'react';
import { ICustomInputProps } from './CustomInput.types';
import TextField from '@mui/material/TextField';

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  type,
  maxLength,
  value,
  error,
  errorMessage,
  onChange,
  slotProps,
  variant = "outlined",
  ...props
}) => {
  const CustomSlotProps = {
    ...slotProps,
    htmlInput: {
      maxLength: maxLength,
    },
  };
  return (
    <div className="w-full">
      <TextField
        {...props}
        label={label}
        type={type}
        value={value}
        slotProps={CustomSlotProps}
        onChange={onChange}
        error={error}
        variant={variant}
      ></TextField>
      {errorMessage && <p className="text-xs mt-1 text-red">{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
