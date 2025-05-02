export interface IMenuProps {
  data: IMenuItem[];
  selectedValue?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  initialSelectedOption: IMenuItem;
  title?: string;
  menuButtonStyle?: string;
  getSelectedValue?: (
    menuItem: 'daily' | 'weekly' | 'monthly' | 'yearly'
  ) => void;
}

export interface IMenuItem {
  id: number;
  value: string;
  label?: string;
}
