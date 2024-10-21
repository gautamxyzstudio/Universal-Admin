'use client';
import EmptyScreenView from '@/components/templates/EmptyScreenView/EmptyScreenView';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import React from 'react';
import { IDataTableProps } from './DataTable.types';

const DataTable: React.FC<IDataTableProps> = ({
  columns,
  rows,
  isLoading,
  ...props
}) => {
  const { data } = useDemoData({
    rowLength: 150,
    maxColumns: 9,
    dataSet: 'Employee',
  });

  console.log(isLoading);
  return (
    <div className="flex p-4 h-[95%] w-full bg-white shadow-custom-shadow rounded-[8px] justify-center items-center">
      {/* Show EmptyScreenView if there is an error or no rows */}
      {!isLoading && (rows?.length === 0 || props.error) && (
        <EmptyScreenView {...props} />
      )}
      {isLoading ? (
        <DataGrid
          sx={{
            height: '98%',
            border: 0,
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#FAFAFA',
              color: '#868686',
              fontSize: '12px',
              lineHeight: '16px',
            },
            '& .MuiDataGrid-row': {
              '--rowBorderColor': 'none',
            },
            '.mui-1xvmu89-MuiDataGrid-overlayWrapper': {
              backgroundColor: '#FAFAFA',
            },
          }}
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
          disableColumnMenu
          disableColumnSorting
          disableColumnResize
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          hideFooter
          rowHeight={68}
          columns={columns}
          rows={data.rows}
        />
      ) : (
        rows?.length > 0 && (
          <DataGrid
            sx={{
              height: '95%',
              border: 0,
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#FAFAFA',
                color: '#868686',
                fontSize: '12px',
                lineHeight: '16px',
              },
              '& .MuiDataGrid-row': {
                '--rowBorderColor': 'none',
              },
              '.mui-1xvmu89-MuiDataGrid-overlayWrapper': {
                backgroundColor: '#FAFAFA',
              },
            }}
            loading={isLoading}
            slotProps={{
              loadingOverlay: {
                variant: 'skeleton',
                noRowsVariant: 'skeleton',
              },
            }}
            disableColumnMenu
            disableColumnSorting
            disableColumnResize
            disableRowSelectionOnClick
            disableColumnSelector
            disableColumnFilter
            hideFooter
            rowHeight={68}
            columns={columns}
            rows={rows}
          />
        )
      )}
    </div>
  );
};

export default DataTable;
