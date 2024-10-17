import { TableProps } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener, GridRowsProp } from "@mui/x-data-grid";
import React from "react";

export interface IDataTable extends TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  onRowClick?: GridEventListener<"rowClick">;
}

const DataTable: React.FC<IDataTable> = ({ columns, rows, onRowClick }) => {

  
 
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
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        
      onRowClick={onRowClick}
        hideFooterSelectedRowCount
        rowHeight={68}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};

export default DataTable;
