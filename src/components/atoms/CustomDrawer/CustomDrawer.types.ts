import React from 'react';

export interface ICustomDrawerProps {
  open: boolean;
  children: React.ReactNode;
  onClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  width?: string | number | null;
}