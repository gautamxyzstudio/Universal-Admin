import { TableProps } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";

export interface IDataTable extends TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const DataTable: React.FC<IDataTable> = ({ columns, rows }) => {
  return (
    <div className="flex justify-center items-center ">
      <DataGrid
        sx={{
          border: 0,
          height: "65vh",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#FAFAFA",
            color: "#868686",
            fontSize: "12px",
            lineHeight: "16px",
          },
          "& .MuiDataGrid-row": {
            "--rowBorderColor": "none",
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        
        hideFooterSelectedRowCount
        rowHeight={68}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};

export default DataTable;
