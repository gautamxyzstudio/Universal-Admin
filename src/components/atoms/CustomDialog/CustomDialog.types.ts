import { Breakpoint } from '@mui/material';
import React from 'react';

export interface ICustomDialogProps {
  open: boolean;
  maxWidth?: false | Breakpoint | undefined;
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
}
