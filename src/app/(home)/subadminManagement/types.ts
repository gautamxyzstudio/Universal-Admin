import { GridColDef } from '@mui/x-data-grid';

export const subAdminDataColumn: GridColDef[] = [
  {
    field: 'UserNameFL',
    headerName: 'Name',
    width: 280,
  },
  {
    field: 'email',
    headerName: 'E-Mail',
    width: 287,
  },
  {
    field: 'phoneNumber',
    headerName: 'Contact Number',
    width: 270,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 140,
  },
];
