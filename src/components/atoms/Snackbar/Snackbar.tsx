import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { getGgColorThroughToastType, ISnackbarProps } from './Snackbar.types';
import Image from 'next/image';
import { Icons } from '../../../../public/exporter';

const CustomSnackbar: React.FC<ISnackbarProps> = ({
  open,
  handleClose,
  message,
  type = 'error',
}) => {
  const className = getGgColorThroughToastType(type);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <div
        className={`${className} + " flex w-96 min-h-10 p-4 rounded-sm flex-row justify-between items-start gap-x-2 `}
      >
        <h1 className="text-white">{message}</h1>
        <Image
          className="cursor-pointer"
          onClick={handleClose}
          alt="cross"
          src={Icons.cross}
        />
      </div>
    </Snackbar>
  );
};

export default CustomSnackbar;
