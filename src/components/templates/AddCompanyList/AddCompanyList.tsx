/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FormDrawer from '@/components/molecules/DrawerTypes/FormDrawer/FormDrawer';
import { STRINGS } from '@/constant/en';
import React, { useCallback, useEffect, useState } from 'react';
import { ICompany } from '@/api/fetures/Company/Company.types';
import {
  useGetCompanyQuery,
  useLazyGetCompanyQuery,
} from '@/api/fetures/Company/CompanyApi';
import SearchField from '@/components/molecules/InputTypes/SearchInput/SearchInput';
import { Icons, Images } from '../../../../public/exporter';
import Image from 'next/image';
import { useDemoData } from '@mui/x-data-grid-generator';
import VirtualList from '@/components/molecules/VirtualList/VirtualList';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';

import IconWithText from '@/components/molecules/IconWithText/IconWithText';
import { IAddCompanyListProps } from './AddCompanyList.types';

const AddCompanyList: React.FC<IAddCompanyListProps> = ({
  show,
  setGlobalModalState,
  onSelectCompany,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchCompanies, { isLoading, error }] = useLazyGetCompanyQuery();
  const [isLastPage, setIsLastPage] = useState(true);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [displayFrom, setDisplayFrom] = useState(show);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);

  const loadMore = () => {
    if (!isLastPage) {
      fetchCompaniesHandler();
    }
  };

  useEffect(() => {
    if (displayFrom) {
      fetchCompaniesHandler(true);
    }
  }, [displayFrom]);

  useEffect(() => {
    setDisplayFrom(show);
  }, [show]);

  const fetchCompaniesHandler = async (isFirstPage?: boolean) => {
    let page = isFirstPage ? 1 : currentPage + 1;
    try {
      const response = await fetchCompanies({ page: page }).unwrap();
      if (response) {
        setCompanies((prev) => [...prev, ...response.data]);
        setCurrentPage(response.meta.pagination.page);
        setIsLastPage(
          response?.data.length === 0 ||
            currentPage === response?.meta.pagination.pageCount
        );
      }
    } catch (error) {
      console.log('Error fetching companies', error);
    }
  };

  const { data: dummyData } = useDemoData({
    rowLength: 10,
    maxColumns: 1,
    dataSet: 'Employee',
  });

  const onTabCompanyHandler = (company: ICompany) => {
    setSelectedCompany(company);
  };

  const onPressCross = () => {
    setDisplayFrom(false);
    setSelectedCompany(null);
    setGlobalModalState(false);
  };

  const handleClickOutside = (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason == 'backdropClick') {
      return;
    }
    setDisplayFrom(false);
    setGlobalModalState(false);
  };

  const renderLoadingItem = useCallback(
    (index: number) => (
      <div key={index} className="flex w-full py-2 px-6">
        <div className="animate-pulse w-full h-12 flex items-center justify-start gap-2">
          <div className="animate-pulse w-9 h-9 rounded-full bg-slate-300 flex" />
          <div className="animate-pulse w-full h-9 rounded bg-slate-300" />
        </div>
      </div>
    ),
    []
  );

  const renderItemContent = useCallback(
    (index, company: ICompany) => {
      const isSelected = selectedCompany && selectedCompany.id === company.id;
      const bgColor = isSelected
        ? 'bg-lightPrimary border-b-[1px] border-primary '
        : 'bg-white  border-b-[1px] border-borderGreySecondary';

      return (
        <div
          key={company.id}
          className={'px-6 py-3  ' + bgColor}
          onClick={() => onTabCompanyHandler(company)}
        >
          <UserNameWithImage
            imageStyle="!w-9 !h-9"
            nameStyle=""
            name={company.companyname ?? ''}
            companyNameStyle="text-disable text-[12px] leading-4"
            companyName={company.Industry ?? ''}
            image={company.companylogo}
          />
          <div className="ml-2 mt-2 flex flex-col gap-y-1">
            <IconWithText
              textStyle="text-[12px] leading-4"
              iconStyle="!w-4 !h-4"
              text={company.companyemail ?? ''}
              icon={Icons.emailIcon}
            />
            <IconWithText
              textStyle="text-[12px] leading-4"
              iconStyle="!w-4 !h-4"
              text={company.address ?? ''}
              icon={Icons.locationPin}
            />
          </div>
        </div>
      );
    },
    [selectedCompany]
  );

  return (
    <FormDrawer
      title={STRINGS.selectComp}
      open={show}
      styles={{ width: 436 }}
      handleClose={handleClickOutside}
      onPressCross={onPressCross}
    >
      <VirtualList
        isLoading={isLoading}
        data={isLoading ? dummyData.rows : companies}
        onReachEnd={loadMore}
        isLastPage={isLastPage}
        renderItem={isLoading ? renderLoadingItem : (renderItemContent as any)}
        headerView={
          <div className="flex  w-full  flex-col gap-y-7 px-6 pt-6 pb-3">
            <SearchField />
            <div className="flex gap-x-3 items-center text-[16px] leading-5 text-Black cursor-pointer">
              <div
                className="border border-primary w-8 h-8 rounded-full cursor-pointer p-[9px]"
                onClick={() => console.log('Div clicked')}
              >
                <Image src={Icons.add} alt="Add company" />
              </div>
              Add
            </div>
          </div>
        }
        illustration={Images.noSubAdmin}
        emptyViewTitle={STRINGS.no_companies}
        emptyViewSubTitle={''}
        error={error}
        isDataEmpty={companies.length === 0}
      />

      <div className="bg-white px-6 pt-4 pb-6">
        <CustomButton
          fullWidth
          disabled={!selectedCompany}
          title={STRINGS.confirm}
          onClick={() => selectedCompany && onSelectCompany(selectedCompany)}
          buttonType={'primary-small'}
          variant={'contained'}
        />
      </div>
    </FormDrawer>
  );
};

export default AddCompanyList;
