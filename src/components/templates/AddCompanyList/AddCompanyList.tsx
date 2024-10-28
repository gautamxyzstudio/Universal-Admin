"use client";
import FormDrawer from "@/components/molecules/DrawerTypes/FormDrawer/FormDrawer";
import { STRINGS } from "@/constant/en";
import React, { useCallback, useEffect, useState } from "react";
import { ICompany } from "@/api/fetures/Company/Company.types";
import { useGetCompanyQuery } from "@/api/fetures/Company/CompanyApi";
import SelectedList from "@/components/molecules/SelectedList/SelectedList";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import { Icons } from "../../../../public/exporter";
import Image from "next/image";

const AddCompanyList = ({
  show,
  handleClose,
  onPressCross,
}: {
  show: boolean;
  handleClose:
    | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  onPressCross: () => void;
}) => {
  const { data, isLoading } = useGetCompanyQuery(null);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    setCompanies(data?.data ?? []);
  }, [data]);
  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setCompanies((companies) => [...companies,])
    }, 500)
  }, [setCompanies])
  console.log("==============Start=================");
  console.log(data?.data);
  console.log("==============End=================");
  return (
    <FormDrawer
      title={STRINGS.selectComp}
      open={show}
      handleClose={handleClose}
      onPressCross={onPressCross}
    >
        <SelectedList isLoading={isLoading} datas={companies} onReachEnd={loadMore} headerView={<div className="flex flex-col gap-y-7 px-6 pt-6 pb-3">
              <SearchField />
              <div className="flex gap-x-3 items-center text-[16px] leading-5 text-Black cursor-pointer">
                  <div
                      className="border border-primary w-8 h-8 rounded-full cursor-pointer p-[9px]"
                      onClick={() => console.log("Div clicked")}
                  >
                      <Image src={Icons.add} alt="Add company" />
                  </div>
                  Add
              </div>
          </div>} emptyViewTitle={""} emptyViewSubTitle={""} error={undefined} isDataEmpty={false} />
      {/* <div className="flex flex-col gap-y-7 px-6 pt-6 pb-3">
        <SearchField />
        <div className="flex gap-x-3 items-center text-[16px] leading-5 text-Black cursor-pointer">
          <div
            className="border border-primary w-8 h-8 rounded-full cursor-pointer p-[9px]"
            onClick={() => console.log("Div clicked")}
          >
            <Image src={Icons.add} alt="Add company" />
          </div>
          Add
        </div>
      </div>
      <Virtuoso
        data={companies}
        endReached={loadMore}
        style={{
          scrollbarWidth: "none",
          cursor: "pointer",
        }}
        itemContent={(index, data) => (
          <div className="px-6 py-3 bg-extraWhite">
            <UserNameWithImage
              key={index}
              name={data.companyname ?? ""}
              image={data.companylogo}
            />
          </div>
        )}
      />
      <div className="bg-white px-6 pt-4 pb-6">
        <CustomButton
          fullWidth
          title={STRINGS.confirm}
          onClick={undefined}
          buttonType={"primary-small"}
        />
      </div> */}
    </FormDrawer>
  );
};

export default AddCompanyList;
