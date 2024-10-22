/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useCallback, useMemo } from 'react';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { IDataTableProps } from './DataTable.types';
import EmptyScreenView from '@/components/templates/EmptyScreenView/EmptyScreenView';

const DataTable: React.FC<IDataTableProps> = ({
  rows,
  columns,
  isLoading,
  illustration,
  onReachEnd,
  emptyViewSubTitle,
  emptyViewTitle,
  isDataEmpty,
  error,
}) => {
  const { data } = useDemoData({
    rowLength: 10,
    maxColumns: 9,
    dataSet: 'Employee',
  });

  const tableContainerStyles = useMemo(() => {
    return {
      boxShadow: 'none',
      backgroundColor: '#fff',
    };
  }, []);
  const tableStyles = useMemo(() => {
    return {
      boxShadow: 'none',
      borderCollapse: 'separate',
      tableLayout: 'fixed',
    };
  }, []);

  const rowStyles = useMemo(() => {
    return { border: 'none' };
  }, []);

  const tableCellStyles = useMemo(() => {
    return {
      backgroundColor: '#FAFAFA',
      color: '#121212',
      borderRight: '1px solid #EBEBEB',
      borderBottomColor: '#EBEBEB',
    };
  }, []);
  const VirtuosoTableComponents: TableComponents = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer
        component={Paper}
        sx={tableContainerStyles}
        {...props}
        ref={ref}
      />
    )),
    Table: (props) => <Table {...props} sx={tableStyles} />,
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const rowContent = useCallback(
    (_index: number, row: GridValidRowModel) => (
      <>
        {columns.map((column) => (
          <TableCell key={column.field} sx={rowStyles} align="left">
            {column.renderCell
              ? column.renderCell({ row } as GridRenderCellParams)
              : row[column.field]}
          </TableCell>
        ))}
      </>
    ),
    [columns]
  );

  const rowContentLoading = useCallback(
    () => (
      <>
        {columns.map((column) => (
          <TableCell key={column.field} sx={rowStyles} align="left">
            <div className="animate-pulse flex space-x-4">
              <div
                style={{ width: column.width }}
                className="bg-slate-300 h-5"
              />
            </div>
          </TableCell>
        ))}
      </>
    ),
    [columns]
  );

  const fixedHeaderContent = useCallback(
    () => (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            variant="head"
            align="left"
            style={{ width: column.width }}
            sx={tableCellStyles}
          >
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    ),
    [columns]
  );

  return (
    <div className="flex p-4 h-[95%] w-full bg-white shadow-custom-shadow rounded-[8px] justify-center items-center">
      {isLoading ? (
        <TableVirtuoso
          data={data.rows}
          components={VirtuosoTableComponents as TableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContentLoading}
        />
      ) : rows.length === 0 ? (
        <EmptyScreenView
          emptyViewTitle={emptyViewTitle}
          emptyViewSubTitle={emptyViewSubTitle}
          illustration={illustration}
          error={error}
          isDataEmpty={isDataEmpty}
        />
      ) : (
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents as any}
          atBottomThreshold={0.1}
          endReached={onReachEnd}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      )}
    </div>
  );
};

export default DataTable;
