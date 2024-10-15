"use client";
import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import DataTable from "@/components/atoms/DataTable/DataTable";
import { STRINGS } from "@/constant/en";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import SearchField from "@/components/atoms/SearchField";
import CustomInput from "@/components/atoms/CustomInput/CustomInput";
import { Box, MenuItem } from "@mui/material";

const EmployeeManagement = () => {
  const [docStatusValue, setDocStatusValue] = useState(STRINGS.all); 
  const [workStatusValue, setWorkStatusValue] = useState(STRINGS.all);
  const handleAddEmployee = () => {
    console.log("Add Employee");
    // TODO: Add logic to add employee here.
  };
  const columns = [
    {
      field: "employee_name",
      headerName: "Employee Name",
      width: 224,
    },
    {
      field: "contact_details",
      headerName: "Contact Details",
      width: 224,
    },
    {
      field: "sin_number",
      headerName: "SIN Number",
      width: 180,
    },
    {
      field: "license_number",
      headerName: "License Number",
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
      width: 120,
    },
  ];

  const rows = [
    {
      id: 1,
      employee_name: "John Doe",
      contact_details: "123 Main St, City, Country",
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 2,
      employee_name: "John Doe",
      contact_details: "123 Main St, City, Country",
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 3,
      employee_name: "John Doe",
      contact_details: "123 Main St, City, Country",
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 4,
      employee_name: "Joh",
      contact_details: "123 Main St, City, Country",
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
  ];

  const docStatus = [
    {
      value: STRINGS.all,
      label: STRINGS.all,
    },
    {
      value: STRINGS.pending,
      label: STRINGS.pending,
    },
    {
      value: STRINGS.approved,
      label: STRINGS.approved,
    },
  ];
  const workStatus = [
    {
      value: STRINGS.all,
      label: STRINGS.all,
    },
    {
      value: STRINGS.fullTime,
      label: STRINGS.fullTime,
    },
    {
      value: STRINGS.partTime,
      label: STRINGS.partTime,
    },
  ];

  return (
    <div className="items-center justify-items-center min-h-screen">
      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-Black font-bold text-[24px] leading-7">
          {STRINGS.employeeManagement}
        </h1>
        <CustomButton
          title="Add Employee"
          icon={<Add />}
          onClick={handleAddEmployee}
          size="small"
          sx={{
            textAlign: "center",
            color: "#ffff",
            gap: "4px",
            fontSize: "16px",
            lineHeight: "20px",
            textTransform: "capitalize",
            padding: "10px 12px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="p-4 border rounded-md bg-white flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <SearchField searchStyle=" w-[288px]" />
          <div className=" flex ">
            <div className="inline-flex items-center gap-x-2">
              Document Status
              <CustomInput
                select
                value={docStatusValue}
                onChange={(e) => setDocStatusValue(e.target.value)}
                size="small"
                sx={{
                  width: "100px",
                }}
              >
                {docStatus.map((data, index) => (
                  <MenuItem key={index} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </CustomInput>
            </div>
            <div className="inline-flex items-center ml-4 gap-x-2">
              Work Status
              <CustomInput
                select
                value={workStatusValue}
                onChange={(e) => setWorkStatusValue(e.target.value)}
                size="small"
                sx={{
                  width: "100px",
                }}
              >
                {workStatus.map((data, index) => (
                  <MenuItem key={index} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </CustomInput>
            </div>
          </div>
        </div>
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default EmployeeManagement;
