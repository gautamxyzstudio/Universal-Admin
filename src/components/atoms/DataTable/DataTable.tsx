/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { memo, useCallback, useMemo } from "react";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@mui/material";
import { GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { IDataTableProps } from "./DataTable.types";
import EmptyScreenView from "@/components/templates/EmptyScreenView/EmptyScreenView";
import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";

const DataTable: React.FC<IDataTableProps> = ({
  rows,
  columns,
  onPressRow,
  isLoading,
  illustration,
  tableHeightPercent = 100,
  headerView,
  onReachEnd,
  emptyViewSubTitle,
  emptyViewTitle,
  isDataEmpty,
  error,
}) => {
  const { data } = useDemoData({
    rowLength: 10,
    maxColumns: 9,
    dataSet: "Employee",
  });

  const tableContainerStyles = useMemo(() => {
    return {
      boxShadow: "none",
      backgroundColor: "#fff",
      height: `${tableHeightPercent}% !important`,
      scrollbarWidth: "none",
    };
  }, []);
  const tableStyles = useMemo(() => {
    return {
      boxShadow: "none",
      borderCollapse: "separate",
      tableLayout: "fixed",
    };
  }, []);

  const rowStyles = useMemo(() => {
    return { border: "none", cursor: "pointer" };
  }, []);

  const tableCellStyles = useMemo(() => {
    return {
      backgroundColor: "#FAFAFA",
      color: "#868686",
      borderRight: "1px solid #EBEBEB",
      borderBottomColor: "#EBEBEB",
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
    (index: number, row: GridValidRowModel) => (
      <>
        {columns.map((column, _index) => {
          return (
            <TableCell
              onClick={() => onPressRow && onPressRow(row)}
              key={_index}
              sx={rowStyles}
              align="left"
            >
              {column.field === "sNum" ? (
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

  const fixedFooterContent = useCallback(
    () => (
      <div className="w-full mt-2 flex justify-center items-center">
        <ActivityIndicator size={36} />
      </div>
    ),
    []
  );
  return (
    <div className="p-4  w-full h-full shadow-custom-shadow rounded-[8px] justify-center items-center">
      {rows.length > 0 && <div className="w-full">{headerView}</div>}
      {isLoading ? (
        <TableVirtuoso
          data={data.rows}
          components={VirtuosoTableComponents as TableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContentLoading}
        />
      ) : rows.length === 0 ? (
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
          data={rows}
          components={VirtuosoTableComponents as any}
          defaultItemHeight={70}
          endReached={onReachEnd}
          fixedFooterContent={fixedFooterContent}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      )}
    </div>
  );
};

export default memo(DataTable);
