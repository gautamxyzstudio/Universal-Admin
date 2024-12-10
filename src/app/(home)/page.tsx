"use client";
import { STRINGS } from "@/constant/en";
import Image from "next/image";
import { Icons } from "../../../public/exporter";
import PageHeader from "@/components/organism/PageHeader/PageHeader";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import { Add } from "@mui/icons-material";
import DataTable from "@/components/atoms/DataTable/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useGetAllUsersQuery } from "@/api/fetures/Users/UsersApi";

export default function Home() {
  const { data, isFetching } = useGetAllUsersQuery("");
  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: STRINGS.date,
      width: 100,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "name",
      headerName: STRINGS.name,
      width: 200,
    },
    {
      field: "email",
      headerName: STRINGS.email,
      width: 300,
    },
    {
      field : "status",
      headerName: STRINGS.status,
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return params.row.status === "s1"? "text-green" : "text-red";
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span
            onClick={() => console.log(params.row)}
            className="text-primary sticky"
          >
            {STRINGS.view}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <PageHeader title={STRINGS.dashboard} />
        <div className="flex gap-x-6 items-center">
          <div className=" bg-extraWhite rounded-full  w-9 h-9">
            <Image
              src={Icons.calendar}
              alt="notification"
              className="w-full h-full"
            />
          </div>
          <CustomButton
            title={STRINGS.create}
            onClick={undefined}
            buttonType={"primary"}
            icon={<Add />}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={data}
        isLoading={isFetching}
        withPagination={false}
        headerView={
          <span className="text-Black text-text-md">Recent Activity</span>
        }
      />
    </>
  );
}
