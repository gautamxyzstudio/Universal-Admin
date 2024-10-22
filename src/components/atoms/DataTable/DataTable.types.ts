import { IEmptyScreenViewProps } from '@/components/templates/EmptyScreenView/EmptyScreenView.types';
import { TableProps } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

export interface IDataTableProps extends TableProps, IEmptyScreenViewProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  isLoading: boolean;
  onReachEnd?: (index: number) => void;
}
