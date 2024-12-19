import { ICompany } from "@/api/fetures/Company/Company.types";
import { IEmptyScreenViewProps } from "@/components/templates/EmptyScreenView/EmptyScreenView.types";

export interface ISelectedListProps extends IEmptyScreenViewProps {
  lists: ICompany[];
  isLoading: boolean;
  headerView?: React.ReactNode;
  onSelect?: () => void;
  onReachEnd?: (index: number) => void;
}
