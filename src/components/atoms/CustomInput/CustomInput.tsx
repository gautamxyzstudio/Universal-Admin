import React from 'react';
import { ICustomInputProps } from './CustomInput.types';
import { TextField } from '@mui/material';

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  type,
  value,
  error,
  errorMessage,
  onChange,
  InputProps,
}) => {
  return (
    <div>
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
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiFormLabel-root.MuiInputLabel-root': {
            color: error ? 'red' : 'white',
          },
        }}
        slotProps={{
          input: InputProps,
        }}
      />

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
