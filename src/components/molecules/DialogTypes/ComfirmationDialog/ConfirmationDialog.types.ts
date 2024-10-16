import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Icons } from '../../../../../public/exporter';
import { MouseEventHandler } from 'react';

export type IConfirmationDialogProps = {
  type: IDialogTypes;
  onClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  title?: string;
  description?: string;
  onPressLogout?: MouseEventHandler<HTMLButtonElement>;
  open: boolean;
};

export type IDialogTypes = 'logout' | 'success';

export const getDialogAttributes = (
  type: IDialogTypes
): {
  icon: StaticImport;
} => {
  switch (type) {
    case 'success':
      return {
        icon: Icons.success,
      };
    case 'logout':
      return {
        icon: Icons.logoutSecondary,
      };
    default:
      return {
        icon: Icons.success,
      };
  }
};
