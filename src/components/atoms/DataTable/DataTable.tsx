/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { memo, useCallback, useMemo } from 'react';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
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
  tableHeightPercent = 100,
  headerView,
  withPagination,
  onPressPageChange,
  totalCount,
  page,
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
      height: `${tableHeightPercent}% !important`,
      scrollbarWidth: 'none',
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
      color: '#868686',
      borderRight: '1px solid #EBEBEB',
      height: 10,
      '.MuiTableCell-head': {
        padding: '8px',
      },
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
      <TableHead {...props} sx={tableCellStyles} ref={ref} />
    )),
    TableRow,

    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
    TableFoot: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableFooter
        sx={{
          position: 'relative !important',
          display: 'flex !important',
          width: '74.5vw',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...props}
        ref={ref}
      />
    )),
  };

  const rowContent = useCallback(
    (index: number, row: GridValidRowModel) => (
      <>
        {columns.map((column, _index) => {
          return (
            <TableCell
              className="bg-white"
              style={{
                position: column.headerName === 'Action' ? 'sticky' : 'unset',
                right: column.headerName === 'Action' ? 0 : 'unset',
                zIndex: column.headerName === 'Action' ? 1 : 0.5,
                cursor: column.headerName === 'Action' ? 'pointer' : 'unset',
                backgroundColor:
                  column.headerName === 'Action' ? '#fafafa' : '#fff',
              }}
              key={_index}
              sx={rowStyles}
              align="left"
            >
              {column.field === 'sNum' ? (
                <span>{index + 1}</span>
              ) : (
                <>
                  {column.renderCell
                    ? column.renderCell({ row } as GridRenderCellParams)
                    : row[column.field]}
                </>
              )}
            </TableCell>
          );
        })}
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
            style={{
              width: column.width,
              position: column.headerName === 'Action' ? 'sticky' : 'unset',
              right: column.headerName === 'Action' ? 0 : 'unset',
              zIndex: column.headerName === 'Action' ? 1 : 0.5,
            }}
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
    <div className="px-4 pt-4  w-full bg-white h-full shadow-custom-shadow rounded-[8px] justify-center items-center">
      <div className="w-full">{headerView}</div>
      {!isLoading && rows.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <EmptyScreenView
            emptyViewTitle={emptyViewTitle}
            emptyViewSubTitle={emptyViewSubTitle}
            illustration={illustration}
            error={error}
            isDataEmpty={isDataEmpty}
          />
        </div>
      ) : (
        <TableVirtuoso
          data={isLoading ? data.rows : rows}
          components={VirtuosoTableComponents as any}
          defaultItemHeight={68}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={isLoading ? rowContentLoading : rowContent}
        />
      )}
      {withPagination && !isDataEmpty && onPressPageChange && (
        <TablePagination
          className="stick"
          component="div"
          sx={{
            '.MuiTablePagination-toolbar': {
              minHeight: '40px',
            },
          }}
          height={32}
          count={totalCount ?? 0}
          page={page ? page - 1 : 0}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
          onPageChange={onPressPageChange}
        />
      )}
    </div>
  );
};

export default memo(DataTable);
