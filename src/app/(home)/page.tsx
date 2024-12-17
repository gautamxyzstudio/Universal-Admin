"use client";
import { STRINGS } from "@/constant/en";
import Image from "next/image";
import { Icons } from "../../../public/exporter";
import PageHeader from "@/components/organism/PageHeader/PageHeader";
import DataTable from "@/components/atoms/DataTable/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useGetAllUsersQuery } from "@/api/fetures/Users/UsersApi";
import { getUsersType } from "@/constant/constant";
import { useEffect, useState } from "react";
import { IUsers } from "@/api/fetures/Users/UsersApi.types";

import { useRouter } from "next/navigation";
import { routeNames } from "@/utility/routesName";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import CustomSpeedDial from "@/components/organism/CustomSpeedDial/CustomSpeedDial";

export default function Home() {
  const route = useRouter();
  const { data, isFetching } = useGetAllUsersQuery("");
  const [users, setUsers] = useState<IUsers[]>([]);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  useEffect(() => {
    if (data) {
      const user = data.data.slice(0, 10);
      console.log(user);
      setUsers(user);
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: STRINGS.date,
      width: 88,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "name",
      headerName: STRINGS.name,
      width: 240,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <UserNameWithImage
            name={params.row.employee?.name ?? params.row.client?.name}
            image={
              params.row.employee?.employeeImage ??
              params.row.client?.clientCompanyLogo
            }
            imageStyle="!w-8 !h-8 object-cover"
          />
        );
      },
    },
    {
      field: "email",
      headerName: STRINGS.email,
      width: 220,
    },
    {
      field: "contact",
      headerName: STRINGS.contactNumber,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            {params.row.employee && params.row.employee.contactNumber}
            {params.row.client && params.row.client.contactNumber}
          </>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return getUsersType(params.row.role);
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span
            onClick={() => {
              if (params.row.employee) {
                route.push(`${routeNames.Employees}/${params.row.employee.id}`);
              }
              if (params.row.client) {
                route.push(`${routeNames.Client}/${params.row.client.id}`);
              }
            }}
            className="text-primary sticky"
          >
            {STRINGS.view}
          </span>
        );
      },
    },
  ];

  const handleOnClickSpeedDial = () => {
    setOpenSpeedDial((prevOpenSpeedDial) => !prevOpenSpeedDial);
  };
  
  return (
    <div className=" w-full h-[86%] mb-5">
      <div className="flex justify-between items-center w-full">
        <PageHeader title={STRINGS.dashboard} />
        <div
          className={`inline-flex gap-x-6 items-center ${
            openSpeedDial ? "w-[10%]" : "w-[17%]"
          } h-[60px]`}
        >
          <Image
            src={Icons.calendar}
            alt="notification"
            className="w-9 h-9 object-contain"
          />

          <CustomSpeedDial
            open={openSpeedDial}
            onClickSpeedDial={handleOnClickSpeedDial}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={users}
        isLoading={isFetching}
        withPagination={false}
        tableHeightPercent={85}
        headerView={
          <span className="text-Black text-text-md">Recent Activity</span>
        }
      />
    </div>
  );
}
