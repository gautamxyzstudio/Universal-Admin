import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type IMenuItemProps = {
  isOpen: boolean;
  onPresItem: (type: string) => void;
  data: IMenuItem[];
  onClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
};

export type IMenuItem = {
  icon: StaticImport;
  value: string;
};
