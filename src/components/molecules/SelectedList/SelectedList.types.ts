import { ICompany } from "@/api/fetures/Company/Company.types";
import { IEmptyScreenViewProps } from "@/components/templates/EmptyScreenView/EmptyScreenView.types";

export interface ISelectedListProps extends IEmptyScreenViewProps {
    datas: ICompany[];
    isLoading: boolean;
    headerView?: React.ReactNode;
onSelect?: ()=> void;
onReachEnd?: (index: number) => void;
}