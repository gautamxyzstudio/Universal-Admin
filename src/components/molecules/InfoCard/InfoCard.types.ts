export interface IInfoCardProps {
  items: IInfoCardItem[];
  isLoading: boolean;
}
export interface IInfoCardItem {
  label: string;
  value: string;
  icon: string;
  weekPercentage: string;
}
