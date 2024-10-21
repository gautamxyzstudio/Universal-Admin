import CustomInput from '@/components/atoms/CustomInput/CustomInput';
import { STRINGS } from '@/constant/en';
import React from 'react';
import { IPasswordInputProps } from './PasswordInput.types';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

const PasswordInput: React.FC<IPasswordInputProps> = ({
  showPassword,
  handleClickShowPassword,
  eyeColor,
  ...props
}) => {
  return (
    <CustomInput
      label={STRINGS.password}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className="z-10"
                onClick={handleClickShowPassword}
                edge="start"
              >
                {showPassword ? (
                  <VisibilityOutlined color={eyeColor ?? 'secondary'} />
                ) : (
                  <VisibilityOffOutlined color={eyeColor ?? 'secondary'} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default PasswordInput;
