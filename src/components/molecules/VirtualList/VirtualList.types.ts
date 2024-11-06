/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmptyScreenViewProps } from '@/components/templates/EmptyScreenView/EmptyScreenView.types';
import { ItemContent, ListRootProps } from 'react-virtuoso';

export interface IVirtualListProps
  extends IEmptyScreenViewProps,
    ListRootProps {
  data: unknown[];
  isLoading: boolean;
  headerView?: React.ReactNode;
  onSelect?: () => void;
  isLastPage?: boolean;
  onReachEnd?: (index: number) => void;
  footerComponent?:
    | React.ComponentType<{
        context?: any;
      }>
    | undefined;
  renderItem?: ItemContent<unknown, any> | undefined;
}
