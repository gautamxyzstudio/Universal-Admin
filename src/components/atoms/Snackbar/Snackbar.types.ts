import { SnackbarCloseReason } from '@mui/material';

export interface ISnackbarProps {
  open: boolean;
  handleClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  message: string;
  type: 'success' | 'error' | 'warning' | 'notification';
  onClick?: () => void;
}

export const getGgColorThroughToastType = (
  type: 'success' | 'error' | 'warning' | 'notification'
) => {
  switch (type) {
    case 'success':
      return 'bg-Green';
    case 'error':
      return 'bg-Red';
    case 'warning':
      return 'bg-yellow';
    case 'notification':
      return 'bg-white';
    default:
      return 'bg-Red';
  }
};

export const getGgTextColorThroughToastType = (
  type: 'success' | 'error' | 'warning' | 'notification'
) => {
  switch (type) {
    case 'success':
      return 'text-white';
    case 'error':
      return 'text-white';
    case 'warning':
      return 'text-white';
    case 'notification':
      return 'text-black';
    default:
      return 'text-white';
  }
};
