import React from 'react';
import { ICustomInputProps } from './CustomInput.types';
import { Input } from '@/app/Mtailwind';

const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  value,
  type,
  error,
  errorMessage,
  onChange,
}) => {
  return (
    <div>
      <Input
        label={label}
        value={value}
        onChange={onChange}
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
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
