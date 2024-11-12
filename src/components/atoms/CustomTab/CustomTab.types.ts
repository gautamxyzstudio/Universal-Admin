import { StaticImageData } from "next/image";
import { TabsProps } from "@mui/material";

export interface ITabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

interface TabItemProps {
  label: string;
  content?: React.ReactNode;
  icon?: StaticImageData;
  status?: string;
  onClickAction? : () =>  void;  // Add onClick action if needed
}

export interface ICustomTabProps  extends TabsProps {
  tabs: TabItemProps[];
  onTabChange?: (event: React.SyntheticEvent, newTabIndex: number) => void;
}
