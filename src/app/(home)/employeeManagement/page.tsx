'use client';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import DataTable from '@/components/atoms/DataTable/DataTable';
import { STRINGS } from '@/constant/en';
import React, { useState } from 'react';
import SearchField from '@/components/molecules/InputTypes/SearchInput/SearchInput';
import { MenuItem } from '@mui/material';
import Image from 'next/image';
import { Images } from '../../../../public/exporter';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import CustomSelectInput from '@/components/molecules/InputTypes/SelectInput/CustomSelectInput';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import TableFilter from '@/components/molecules/TableFilter/TableFilter';

const EmployeeManagement = () => {
  const [docStatusValue, setDocStatusValue] = useState(STRINGS.all);
  const [workStatusValue, setWorkStatusValue] = useState(STRINGS.all);

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
      field: 'employee_name',
      headerName: 'Employee Name',
      width: 224,

      renderCell: (params: GridRenderCellParams) => (
        <Employee name={params?.value?.name} imgsrc={params?.value?.imgsrc} />
      ),
    },
    {
      field: 'contact_details',
      headerName: 'Contact Details',
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <ContactDetails
          phone_number={params?.value?.phone_number}
          email={params?.value?.email}
        />
      ),
    },
    {
      field: 'sin_number',
      headerName: 'SIN Number',
      width: 180,
    },
    {
      field: 'license_number',
      headerName: 'License Number',
      width: 180,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 104,
    },
    {
      field: 'work_status',
      headerName: 'Work Status',
      width: 104,
    },
    {
      field: 'document_status',
      headerName: 'Document Status',
      width: 120,
    },
  ];

  const docStatus = [
    {
      id: 1,
      value: STRINGS.all,
    },
    {
      id: 2,
      value: STRINGS.pending,
    },
    {
      id: 3,
      value: STRINGS.approved,
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

  const onPressPrimaryButton = () => {};

  return (
    <div className="items-center justify-items-center min-h-screen ">
      <PageHeader
        primaryButtonTitle={STRINGS.addEmployee}
        title={STRINGS.employeeManagement}
        onPressPrimaryButton={onPressPrimaryButton}
      />
      <TableFilter
        data={docStatus}
        initialSelectedOption={docStatus[0]}
        title={STRINGS.documentStatus}
      />
      <div className="p-4 border rounded-md bg-white flex flex-col gap-y-4">
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
                    color: '#868686',
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
                    color: '#868686',
                  }}
                  key={index}
                  value={data.value}
                >
                  {data.label}
                </MenuItem>
              ))}
            </CustomSelectInput>
          </div>
          <CustomButton
            title="Export as"
            size="small"
            customStyles={{
              textTransform: 'capitalize',
              '--variant-outlinedColor': '#868686',
              '--variant-outlinedBorder': '#868686',
            }}
            variant="outlined"
            onClick={() => console.log('Eprot as Exel')}
            buttonType={'primary'}
          />
        </div>
        <DataTable
          columns={columns}
          rows={[]}
          isLoading={false}
          emptyViewTitle={''}
          emptyViewSubTitle={''}
          illustration={Images.noSubAdmin}
          error={undefined}
          isDataEmpty={false}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;
