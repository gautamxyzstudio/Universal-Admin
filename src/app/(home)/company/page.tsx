/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ICompany } from '@/api/fetures/Company/Company.types';
import { useLazyGetCompanyQuery } from '@/api/fetures/Company/CompanyApi';
import DataTable from '@/components/atoms/DataTable/DataTable';
import SearchField from '@/components/molecules/InputTypes/SearchInput/SearchInput';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddCompanyForm from '@/components/templates/AddCompanyForm/AddCompanyForm';
import { STRINGS } from '@/constant/en';
import { GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Images } from '../../../../public/exporter';
import { useRouter } from 'next/navigation';

const Company = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [fetchCompanies, { error, isFetching }] = useLazyGetCompanyQuery();
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchState, updateSearchState] = useState<'idle' | 'searching'>(
    'idle'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const fetchCompaniesHandler = async (
    characters: string,
    currentPage: number
  ) => {
    try {
      const response = await fetchCompanies({
        page: currentPage,
        search: characters,
        perPage: 10,
      }).unwrap();
      if (response) {
        setIsLoading(false);
        setCompanies(response.data);
        setTotalRecord(response.meta.pagination.total);
        setCurrentPage(response.meta.pagination.page);
        updateSearchState('idle');
      }
    } catch (error) {
      setIsLoading(false);
      updateSearchState('idle');
      console.log('Error fetching companies', error);
    }
  };
  useEffect(() => {
    if (searchVal.length > 0) {
      updateSearchState('searching');
      handleSearch(searchVal);
    } else {
      fetchCompaniesHandler(searchVal, 1);
    }
  }, [searchVal]);

  const handleSearch = useCallback(
    _.debounce((query) => {
      if (query) {
        fetchCompaniesHandler(query, 1);
      }
    }, 300),
    []
  );

  const router = useRouter();
  const handleOnRowClick = (row: any) => {
    router.push(`/company/${row.id}`);
  };
  const columns: GridColDef[] = [
    {
      headerName: 'S.no',
      width: 48,
      field: 'sNum',
    },
    {
      headerName: 'Company Name',
      width: 240,
      field: 'companyname',
      renderCell: useCallback(
        (params) => (
          <UserNameWithImage
            imageStyle="!w-10 !h-10"
            image={params?.row?.companylogo}
            name={params?.row?.companyname ?? ''}
            type={'white'}
          />
        ),
        []
      ),
    },
    {
      headerName: 'E-mail',
      width: 240,
      field: 'companyemail',
    },
    {
      headerName: 'Co. registered number',
      width: 220,
      field: 'regNo',
    },
    {
      headerName: 'Account creation',
      width: 220,
      field: 'location',
    },
    {
      headerName: 'Action',
      width: 80,
      field: '',
      renderCell: useCallback(
        () => <h1 className="text-sm cursor-pointer text-primary">View</h1>,
        []
      ),
    },
  ];

  const companyAddHandler = (comp: ICompany) => {
    setCompanies((prev) => {
      return [...prev, comp];
    });
  };

  const onPageChangeHandler = (_, pageNumber) => {
    fetchCompaniesHandler('', pageNumber + 1);
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        withPrimaryButton
        primaryButtonTitle={STRINGS.addCompany}
        onPressButton={() => setShowFormModal(true)}
        title={STRINGS.company}
      />
      <DataTable
        columns={columns}
        rows={companies}
        headerView={
          <div className="flex w-full  justify-start items-start mb-4">
            <SearchField
              onPressCross={() => setSearchVal('')}
              onChangeText={(e) => setSearchVal(e.target.value)}
              value={searchVal}
              isLoading={searchState === 'searching'}
            />
          </div>
        }
        isLoading={isFetching}
        page={currentPage}
        totalCount={totalRecord}
        onPressRow={handleOnRowClick}
        onPressPageChange={onPageChangeHandler}
        tableHeightPercent={85}
        emptyViewTitle={STRINGS.no_companies}
        emptyViewSubTitle={''}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={companies.length === 0}
        withPagination={true}
      />
      <AddCompanyForm
        show={showFormModal}
        setGlobalModalState={(state) => setShowFormModal(state)}
        onAddCompanyHandler={companyAddHandler}
      />
    </div>
  );
};

export default Company;
