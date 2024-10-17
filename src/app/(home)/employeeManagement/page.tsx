"use client";
import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import DataTable from "@/components/atoms/DataTable/DataTable";
import { STRINGS } from "@/constant/en";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import { MenuItem } from "@mui/material";
import Image from "next/image";
import { Images } from "../../../../public/exporter";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import CustomSelectInput from "@/components/molecules/InputTypes/SelectInput/CustomSelectInput";
import ExportButton from "@/components/molecules/ButtonTypes/ExportButton/ExportButton";
import { useRouter } from "next/navigation";

const EmployeeManagement = () => {
  const [docStatusValue, setDocStatusValue] = useState(STRINGS.all);
  const [workStatusValue, setWorkStatusValue] = useState(STRINGS.all);

  const handleAddEmployee = () => {
    console.log("Add Employee");
    // TODO: Add logic to add employee here.
  };

  const Employee = ({
    name,
    imgsrc,
  }: {
    name: string;
    imgsrc: StaticImport;
  }) => {
    return (
      <div className="inline-flex items-center gap-x-2 px-2">
        <Image
          src={imgsrc}
          className="w-8 h-8 rounded-full"
          alt="employee image"
        />
        <div className="flex">{name}</div>
      </div>
    );
  };

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

  const columns: GridColDef[] = [
    {
      field: "employee_name",
      headerName: "Employee Name",
      width: 224,

      renderCell: (params: GridRenderCellParams) => (
        <Employee name={params.value.name} imgsrc={params.value.imgsrc} />
      ),
    },
    {
      field: "contact_details",
      headerName: "Contact Details",
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <ContactDetails
          phone_number={params.value.phone_number}
          email={params.value.email}
        />
      ),
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
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 2,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 3,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 4,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 5,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 6,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 7,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 8,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 9,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 10,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
      sin_number: "123456789",
      license_number: "ABC123",
      gender: "Male",
      work_status: "Full-time",
      document_status: "Valid",
    },
    {
      id: 11,
      employee_name: {
        name: "John Doe",
        imgsrc: Images.demoImg,
      },
      contact_details: {
        phone_number: "123-456-7890",
        email: "john.doe@example.com",
      },
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

  const router = useRouter()

  const handleOnRowClick = (params)=>{
    console.log("Row clicked", params.row.id);
    router.push(`/employeeManagement/${params.row.id}`);
  } 
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center pt-4 mb-6">
        <h1 className="text-Black font-bold text-[24px] leading-7">
          {STRINGS.employeeManagement}
        </h1>
        <CustomButton
          title="Add Employee"
          icon={<Add />}
          onClick={handleAddEmployee}
          size="small"
          customStyles={{
            textAlign: "center",
            color: "#ffff",
            gap: "4px",
            fontSize: "16px",
            lineHeight: "20px",
            textTransform: "capitalize",
            padding: "10px 12px",
            borderRadius: "8px",
          }}
          buttonType={"primary"}
        />
      </div>
      <div className="p-4 border rounded-md bg-white flex flex-col gap-y-4 h-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-8">
            <SearchField searchStyle=" w-[288px]" />
            <CustomSelectInput
              label="Document Status"
              value={docStatusValue}
              onChange={(e) => setDocStatusValue(e.target.value)}
            >
              {docStatus.map((data, index) => (
                <MenuItem
                  sx={{
                    color: "#868686",
                  }}
                  key={index}
                  value={data.value}
                >
                  {data.label}
                </MenuItem>
              ))}
            </CustomSelectInput>

            <CustomSelectInput
              label="Work Status"
              value={workStatusValue}
              onChange={(e) => setWorkStatusValue(e.target.value)}
            >
              {workStatus.map((data, index) => (
                <MenuItem
                  sx={{
                    color: "#868686",
                  }}
                  key={index}
                  value={data.value}
                >
                  {data.label}
                </MenuItem>
              ))}
            </CustomSelectInput>
          </div>
          
          <ExportButton onClick={()=>console.log("Export as Excel")} />
        </div>
        <DataTable columns={columns} rows={rows} onRowClick={handleOnRowClick} />
      </div>
    </div>
  );
};

export default EmployeeManagement;
