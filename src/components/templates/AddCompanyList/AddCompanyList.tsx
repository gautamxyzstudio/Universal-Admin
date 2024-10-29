"use client";
import FormDrawer from "@/components/molecules/DrawerTypes/FormDrawer/FormDrawer";
import { STRINGS } from "@/constant/en";
import React, { useCallback, useEffect, useState } from "react";
import { ICompany } from "@/api/fetures/Company/Company.types";
import { useGetCompanyQuery } from "@/api/fetures/Company/CompanyApi";
import SelectedList from "@/components/molecules/SelectedList/SelectedList";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import { Icons, Images } from "../../../../public/exporter";
import Image from "next/image";
import { IAddCompanyListProps } from "./AddCompanyList.types";
import AddCompanyForm from "../AddCompanyForm/AddCompanyForm";

const AddCompanyList: React.FC<IAddCompanyListProps> = ({
  show,
  handleClose,
  onPressCross,

}) => {
  const { data, isLoading, error } = useGetCompanyQuery(null);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [companyForm, setCompanyForm] = useState<boolean>(false);

  useEffect(() => {
    setCompanies(data?.data ?? []);
  }, [data]);

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setCompanies((companies) => [...companies]);
    }, 5000);
  }, [setCompanies]);
  return (
    <FormDrawer
      title={STRINGS.selectComp}
      open={show}
      handleClose={handleClose}
      onPressCross={onPressCross}
    >
      <SelectedList
      
        isLoading={isLoading}
        lists={companies}
        onReachEnd={loadMore}
        headerView={
          <>
            <div className="flex flex-col gap-y-7 px-6 pt-6 pb-3">
              <SearchField />
              <div
                className="flex gap-x-3 items-center text-[16px] leading-5 text-Black cursor-pointer"
                onClick={() => {
                  console.log("Div clicked");
                  setCompanyForm(true);
                }}
              >
                <div className="border border-primary w-8 h-8 rounded-full cursor-pointer p-[9px]">
                  <Image src={Icons.add} alt="Add company" />
                </div>
                Add
              </div>
            </div>
            <AddCompanyForm
              show={companyForm}
              setGlobalModalState={(state) => setCompanyForm(state)}
              onAddCompanyHandler={() => console.log("Add Company")}
            />
          </>
        }
        illustration={Images.noSubAdmin}
        emptyViewTitle={STRINGS.noCompany}
        emptyViewSubTitle={STRINGS.noCompanyDec}
        error={error}
        isDataEmpty={companies.length === 0}
      />
    </FormDrawer>
  );
};

export default AddCompanyList;
