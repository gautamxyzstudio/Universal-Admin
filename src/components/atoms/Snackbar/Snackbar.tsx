import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {
  getGgColorThroughToastType,
  getGgTextColorThroughToastType,
  ISnackbarProps,
} from './Snackbar.types';
import Image from 'next/image';
import { Icons } from '../../../../public/exporter';

const CustomSnackbar: React.FC<ISnackbarProps> = ({
  open,
  handleClose,
  message,
  type = 'error',
  onClick,
}) => {
  const className = getGgColorThroughToastType(type);
  const textColor = getGgTextColorThroughToastType(type);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: type === 'notification' ? 'bottom' : 'top',
        horizontal: 'right',
      }}
      open={open}
      onClick={onClick}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <div
        className={`${className} + cursor-pointer " rounded-lg flex w-96 min-h-10 p-4 flex-row shadow-lg justify-between items-start gap-x-2 `}
      >
        <h1 className={`${textColor} ${className}`}>{message}</h1>
        <Image
          className={`cursor-pointer`}
          onClick={handleClose}
          alt="cross"
          src={type !== 'notification' ? Icons.cross : Icons.circleCross}
        />
      </div>
    </Snackbar>
  );
};

export default CustomSnackbar;
