import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type IMenuItemProps = {
  isOpen: boolean;
  data: IMenuItem[];
  menuButton: React.ReactNode;
  textSize?: string;
};

export type IMenuItem = {
  icon: StaticImport;
  value: string;
  onPresItem: (type: string) => void;
};
