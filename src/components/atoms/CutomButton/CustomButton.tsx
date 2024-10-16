import React from 'react';

// import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  getStylesFromButtonType,
  ICustomButtonProps,
} from './CustomButton.types';
import { CircularProgress } from '@mui/material';

const CustomButton: React.FC<ICustomButtonProps> = ({
  title,
  onClick,
  isLoading,
  buttonType = 'primary',
  size,
  customStyles,
  fullWidth,
  variant = 'contained',
  icon,
  ...props
}) => {
  const buttonStyles = {
    ...getStylesFromButtonType(buttonType),
    ...customStyles,
  };
  return (
    <LoadingButton
      loading={isLoading}
      variant={isLoading ? 'outlined' : variant}
      loadingPosition="start"
      loadingIndicator={<CircularProgress color="inherit" />}
      fullWidth={fullWidth}
      size={size}
      sx={{ ...buttonStyles, cursor: 'pointer' }}
      onClick={onClick}
    >
      {icon}
      {title}
    </LoadingButton>
  );
};

export default CustomButton;
