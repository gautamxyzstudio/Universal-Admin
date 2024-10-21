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
  ...props
}) => {
  let CustomSlotProps = {
    ...slotProps,
    htmlInput: {
      maxLength: maxLength,
    },
  };
  return (
    <div>
      <TextField
        {...props}
        label={label}
        type={type}
        value={value}
        slotProps={CustomSlotProps}
        onChange={onChange}
        error={error}
        variant="outlined"
      ></TextField>
      {errorMessage && <p className="text-xs mt-1 text-red">{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
