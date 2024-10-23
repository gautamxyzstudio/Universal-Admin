"use client";
import DataTable from "@/components/atoms/DataTable/DataTable";
import { STRINGS } from "@/constant/en";
import React, { useEffect } from "react";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import { Images } from "../../../../public/exporter";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import PageHeader from "@/components/organism/PageHeader/PageHeader";
import TableFilter from "@/components/molecules/TableFilter/TableFilter";
import { docStatus, workStatus } from "./types";
import { useGetEmployeesQuery } from "@/api/fetures/Employee/EmployeeApi";
import ExportButton from "@/components/molecules/ButtonTypes/ExportButton/ExportButton";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";

const EmployeeManagement = () => {
  const { data } = useGetEmployeesQuery(null);

  useEffect(() => {
    console.log(data, "EMPLOYEE DATA");
  }, [data]);
  const columns: GridColDef[] = [
    {
      field: "employee_name",
      headerName: "Employee Name",
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <UserNameWithImage
          type="green"
          name={params.row.employee_name.name}
          image={params.row.employee_name.image}
        />
      ),
    },
    {
      field: "contact_details",
      headerName: "Contact Details",
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <ContactDetails
          phone_number={params.row.contact_details.phone_number}
          email={params.row.contact_details.email}
        />
      ),
    },
    {
      field: "sin_number",
      headerName: "SIN Number",
      width: 180,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 104,
    },
    {
      field: "work_status",
      headerName: "Work Status",
      width: 104,
    },
    {
      field: "document_status",
      headerName: "Document Status",
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const status =
          params.row.document_status === STRINGS.approved
            ? "text-green"
            : "text-yellow";
        return <span className={status}>{params.row.document_status}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 104,
      renderCell: (params: GridRenderCellParams) => {
        const action = params.row.action = STRINGS.view
        return <span className="text-primary">{action}</span>;
      },
    },
  ];
  const rows = [
    {
      id: 1,
      employee_name: {
        name: "John Doe",
        image: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status:  STRINGS.approved,
      
    },
    {
      id: 2,
      employee_name: {
        name: "John Doe",
        image: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status:  STRINGS.pending,
      
    },
    {
      id: 3,
      employee_name: {
        name: "John Doe",
        image: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: STRINGS.approved,
      
    },
    {
      id: 4,
      employee_name: {
        name: "John Doe",
        image: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status:  STRINGS.pending,
    },
    {
      id: 5,
      employee_name: {
        name: "John Doe",
        image: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status:  STRINGS.pending,
    },
  ];
  const onPressPrimaryButton = () => {};
  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        primaryButtonTitle={STRINGS.addEmployee}
        title={STRINGS.employeeManagement}
        onPressPrimaryButton={onPressPrimaryButton}
      />
      <DataTable
        columns={columns}
        rows={rows}
        headerView={
          <div className="flex w-full  justify-between items-center mb-4">
            <div className="flex items-center">
              <SearchField searchStyle="w-[288px]" />
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
        isLoading={false}
        emptyViewTitle={STRINGS.noEmployees}
        emptyViewSubTitle={""}
        illustration={Images.noSubAdmin}
        error={undefined}
        isDataEmpty={false}
      />
    </div>
  );
};

export default EmployeeManagement;

const ContactDetails = ({
  phone_number,
  email,
}: {
  phone_number: string;
  email: string;
}) => {
  return (
    <div className="px-2 py-[14px] flex flex-col text-[14px] leading-[18px] justify-center h-full w-full">
      {phone_number}
      <span className="text-disable">{email}</span>
    </div>
  );
};
