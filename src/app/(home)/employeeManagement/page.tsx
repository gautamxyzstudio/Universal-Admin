'use client';
import DataTable from '@/components/atoms/DataTable/DataTable';
import { STRINGS } from '@/constant/en';
import React from 'react';
import SearchField from '@/components/molecules/InputTypes/SearchInput/SearchInput';

import Image from 'next/image';
import { Images } from '../../../../public/exporter';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import TableFilter from '@/components/molecules/TableFilter/TableFilter';
import { docStatus, workStatus } from './types';

const EmployeeManagement = () => {
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

  const onPressPrimaryButton = () => {};

  return (
    <div className="items-center justify-items-center min-h-screen ">
      <PageHeader
        primaryButtonTitle={STRINGS.addEmployee}
        title={STRINGS.employeeManagement}
        onPressPrimaryButton={onPressPrimaryButton}
      />
      <DataTable
        columns={columns}
        rows={[]}
        headerView={
          <div className="flex w-full  justify-between items-center">
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
          </div>
        }
        isLoading={false}
        emptyViewTitle={''}
        emptyViewSubTitle={''}
        illustration={Images.noSubAdmin}
        error={undefined}
        isDataEmpty={false}
      />
    </div>
  );
};

export default EmployeeManagement;
