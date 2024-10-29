import { SxProps, Theme } from '@mui/material';
import React from 'react';

export interface ICustomDrawerProps {
  open: boolean;
  children: React.ReactNode;
  styles?: SxProps<Theme> | undefined;
  onClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
}
