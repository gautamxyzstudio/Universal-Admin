import { TableProps } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";

export interface IDataTable extends TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  
}

const DataTable: React.FC<IDataTable> = ({ columns, rows}) => {
  return (
    <div className="flex">
      <DataGrid
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#FAFAFA",
          },
        }}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};

export default DataTable;
