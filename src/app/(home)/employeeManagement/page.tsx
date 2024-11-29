/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DataTable from "@/components/atoms/DataTable/DataTable";
import { STRINGS } from "@/constant/en";
import React, { useEffect, useState } from "react";
import { Images } from "../../../../public/exporter";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import PageHeader from "@/components/organism/PageHeader/PageHeader";
import TableFilter from "@/components/molecules/TableFilter/TableFilter";
import { docStatus, workStatus } from "./types";
import { useGetEmployeesQuery } from "@/api/fetures/Employee/EmployeeApi";
import ExportButton from "@/components/molecules/ButtonTypes/ExportButton/ExportButton";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { useRouter } from "next/navigation";
import { IEmployeeBasic } from "@/api/fetures/Employee/EmployeeApi.types";
import ContactDetails from "@/components/molecules/ContactDetails/ContactDetails";

const EmployeeManagement = () => {
  const { data, isLoading, error } = useGetEmployeesQuery(null);
  const router = useRouter();
  const [employees, setEmployees] = useState<IEmployeeBasic[]>(
    data?.employees ?? []
  );

  useEffect(() => {
    if (data) {
      setEmployees(data?.employees);
    }
  }, [data]);

  const handleOnRowClick = (row: any) => {
    router.push(`/employeeManagement/${row.id}`);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Employee Name",
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <UserNameWithImage
          type={"white"}
          imageStyle="!w-8 !h-8 object-cover"
          name={params.row.name}
          image={params.row.selfie}
        />
      ),
    },
    {
      field: "contact_details",
      headerName: "Contact Details",
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <ContactDetails phone={params.row.phone} email={params.row.email} />
      ),
    },
    {
      field: "sinNo",
      headerName: "SIN Number",
      width: 180,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 104,
    },
    {
      field: "workStatus",
      headerName: "Work Status",
      width: 104,
    },
    {
      field: "docStatus",
      headerName: "Document Status",
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const status =
          params.row.document_status === STRINGS.approved
            ? "text-green"
            : "text-yellow";
        return <span className={status}>{params.row?.docStatus}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 104,
      renderCell: () => {
        return <span className="text-primary">{STRINGS.view}</span>;
      },
    },
  ];
  const onPressPrimaryButton = () => {};
  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        primaryButtonTitle={STRINGS.addEmployee}
        title={STRINGS.employeeManagement}
        onPressButton={onPressPrimaryButton}
      />
      <DataTable
        columns={columns}
        onPressRow={handleOnRowClick}
        rows={employees}
        headerView={
          <div className="flex w-full  justify-between items-center mb-4">
            <div className="flex items-center">
              {/* <SearchField
                searchStyle="w-[288px]"
                onChangeText={function (
                  event: React.ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
                value={''}
                isLoading={false}
                onPressCross={function (): void {
                  throw new Error('Function not implemented.');
                }}
              /> */}
            </div>
            <div className="flex flex-row gap-x-8">
              <TableFilter
                data={docStatus}
                initialSelectedOption={docStatus[0]}
                title={STRINGS.documentStatus}
              />
              <TableFilter
                data={workStatus}
                initialSelectedOption={workStatus[0]}
                title={STRINGS.workStatus}
              />
            </div>
            <ExportButton onClick={undefined} />
          </div>
        }
        isLoading={isLoading}
        tableHeightPercent={90}
        emptyViewTitle={STRINGS.noEmployees}
        emptyViewSubTitle={""}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={employees.length === 0}
      />
    </div>
  );
};

export default EmployeeManagement;
