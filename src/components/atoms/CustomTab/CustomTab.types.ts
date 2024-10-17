export interface ITabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

interface TabItemProps {
  label: string;
  content: React.ReactNode;
}

export interface ICustomTabProps {
  tabs: TabItemProps[];
}
