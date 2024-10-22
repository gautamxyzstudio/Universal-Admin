export interface IMenuProps {
  data: IMenuItem[];
  initialSelectedOption: IMenuItem;
  title: string;
}

export interface IMenuItem {
  id: number;
  value: string;
}
