/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmptyScreenViewProps } from '@/components/templates/EmptyScreenView/EmptyScreenView.types';
import { TableProps } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

export interface IDataTableProps extends TableProps, IEmptyScreenViewProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  isLoading: boolean;
  headerView?: React.ReactNode;
  tableHeightPercent?: number;
  onPressRow?: (row: unknown) => void;
  onPressPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  footerComponent?:
    | React.ComponentType<{
        context?: any;
      }>
    | undefined;
  withPagination: boolean;
  page?: number;
  totalCount?: number;
}
