/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DataTable from '@/components/atoms/DataTable/DataTable';
import { STRINGS } from '@/constant/en';
import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../../../public/exporter';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import { useLazyGetEmployeesQuery } from '@/api/fetures/Employee/EmployeeApi';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import { useRouter } from 'next/navigation';
import { IEmployeeBasic } from '@/api/fetures/Employee/EmployeeApi.types';
import ContactDetails from '@/components/molecules/ContactDetails/ContactDetails';
import SearchField from '@/components/molecules/InputTypes/SearchInput/SearchInput';
import { getDocumentStatusTextByStatus } from '@/utility/utils';
import _ from 'lodash';
const EmployeeManagement = () => {
  const [fetchEmployees, { data, isFetching, error }] =
    useLazyGetEmployeesQuery();
  const router = useRouter();
  const [employees, setEmployees] = useState<IEmployeeBasic[]>(
    data?.employees ?? []
  );
  const [searchVal, setSearchVal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchState, updateSearchState] = useState<'idle' | 'searching'>(
    'idle'
  );

  useEffect(() => {
    if (searchVal.length > 0) {
      updateSearchState('searching');
      handleSearch(searchVal);
    } else {
      getEmployees(searchVal, 1);
    }
  }, [searchVal]);

  const handleSearch = useCallback(
    _.debounce((query) => {
      if (query) {
        getEmployees(query, 1);
      }
    }, 300),
    []
  );

  const getEmployees = async (searchVal: string, page: number) => {
    try {
      const fetchEmployeesResponse = await fetchEmployees({
        searchVal: searchVal,
        pageNo: page,
      }).unwrap();
      if (fetchEmployeesResponse) {
        setEmployees(fetchEmployeesResponse.employees);
        setCurrentPage(fetchEmployeesResponse.pagination.page);
        setTotalRecord(fetchEmployeesResponse.pagination.total);
        updateSearchState('idle');
      }
    } catch (error) {
      setEmployees([]);
      updateSearchState('idle');
      console.log('Error fetching employees', error);
    }
  };

  const handleOnRowClick = (row: IEmployeeBasic) => {
    router.push(`/employeeManagement/${row.detailsId}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Employee Name',
      width: 224,

      renderCell: (params: GridRenderCellParams) => (
        <UserNameWithImage
          type={'white'}
          imageStyle="!w-8 !h-8 object-cover"
          name={params.row.name}
          image={params.row.selfie}
        />
      ),
    },
    {
      field: 'contact_details',
      headerName: 'Contact Details',
      width: 224,
      renderCell: (params: GridRenderCellParams) => (
        <div className=" flex flex-row  justify-center items-center h-full">
          <ContactDetails phone={params.row.phone} email={params.row.email} />
        </div>
      ),
    },
    {
      field: 'sinNo',
      headerName: 'SIN Number',
      width: 112,
    },
    {
      field: 'license number',
      headerName: 'License Number',
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex flex-col">
            {params.row.securityAdvNo && (
              <span className="text-sx text-black font-bold">
                {STRINGS.advance}
                <span className="text-sx  text-black font-normal">
                  {params.row.securityAdvNo}
                </span>
              </span>
            )}
            {params.row.securityBasicNo && (
              <span className="text-sx text-black font-bold">
                {STRINGS.basic}
                <span className="text-sx  text-black font-normal">
                  {params.row.securityBasicNo}
                </span>
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 104,
    },
    {
      field: 'docStatus',
      headerName: 'Document Status',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const status =
          params.row.document_status === STRINGS.approved
            ? 'text-Green'
            : 'text-yellow';
        return (
          <span className={status}>
            {getDocumentStatusTextByStatus(params.row?.docStatus)}
          </span>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span
            onClick={() => handleOnRowClick(params.row)}
            className="text-primary sticky"
          >
            {STRINGS.view}
          </span>
        );
      },
    },
  ];

  const onPageChangeHandler = (_, pageNumber) => {
    getEmployees('', pageNumber + 1);
  };

  const onPressPrimaryButton = () => {};
  return (
    <div className="w-full h-[86%] mb-5">
      <PageHeader
        title={STRINGS.employeeManagement}
        primaryButtonTitle={STRINGS.addEmployee}
        onPressButton={onPressPrimaryButton}
        withPrimaryButton={false}
      />
      <DataTable
        columns={columns}
        rows={employees}
        headerView={
          <div className="flex w-full  justify-between items-center mb-4">
            <div className="flex items-center">
              <SearchField
                onPressCross={() => setSearchVal('')}
                onChangeText={(e) => setSearchVal(e.target.value)}
                value={searchVal}
                isLoading={searchState === 'searching'}
              />
            </div>
            {/* <div className="flex flex-row gap-x-8">
              <TableFilter
                data={docStatus}
                initialSelectedOption={docStatus[0]}
                title={STRINGS.documentStatus}
              />
            </div> */}
          </div>
        }
        isLoading={isFetching}
        tableHeightPercent={85}
        emptyViewTitle={STRINGS.noEmployees}
        emptyViewSubTitle={''}
        illustration={Images.noSubAdmin}
        error={error}
        page={currentPage}
        totalCount={totalRecord}
        onPressPageChange={onPageChangeHandler}
        isDataEmpty={employees.length === 0}
        withPagination={true}
      />
    </div>
  );
};

export default EmployeeManagement;
