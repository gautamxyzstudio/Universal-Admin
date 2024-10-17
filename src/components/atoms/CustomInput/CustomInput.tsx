import React from 'react';
import { ICustomInputProps } from './CustomInput.types';
import { TextField } from '@mui/material';

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  type,
  maxLength,
  value,
  error,
  errorMessage,
  onChange,
  ...props
}) => {
  return (
    <div>
      <TextField
        {...props}
        label={label}
        type={type}
        value={value}
        slotProps={{
          htmlInput: {
            maxLength: maxLength,
          },
        }}
        onChange={onChange}
        error={error}
        variant="outlined"
      ></TextField>
      {errorMessage && <p className="text-xs mt-1 text-red">{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
