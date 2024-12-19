import { SelectChangeEvent } from "@mui/material";

export type IMenuItemProps = {
  itemLabel: string | null | undefined;
  itemValue: string | null | undefined;
};
export interface ISelectInputProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void ;
  menuItem: IMenuItemProps[];
}
