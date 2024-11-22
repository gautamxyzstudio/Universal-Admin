/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ICompany } from "@/api/fetures/Company/Company.types";
import { useLazyGetCompanyQuery } from "@/api/fetures/Company/CompanyApi";
import DataTable from "@/components/atoms/DataTable/DataTable";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import PageHeader from "@/components/organism/PageHeader/PageHeader";
import AddCompanyForm from "@/components/templates/AddCompanyForm/AddCompanyForm";
import { STRINGS } from "@/constant/en";
import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { Images } from "../../../../public/exporter";
import { useRouter } from "next/navigation";

const Company = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);
  const [fetchCompanies, { error }] = useLazyGetCompanyQuery();
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchState, updateSearchState] = useState<"idle" | "searching">(
    "idle"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const fetchCompaniesHandler = async (
    characters: string,
    isFirstPage?: boolean
  ) => {
    const page = isFirstPage ? currentPage : currentPage + 1;
    try {
      const response = await fetchCompanies({
        page: page,
        search: characters,
      }).unwrap();
      if (response) {
        setIsLoading(false);
        if (page === 1) {
          setCompanies(response.data);
        } else {
          setCompanies((prev) => [...prev, ...response.data]);
        }
        setCurrentPage(response.meta.pagination.page);
        updateSearchState("idle");
        setIsLastPage(response.meta.pagination.pageCount === page);
      }
    } catch (error) {
      setIsLoading(false);
      updateSearchState("idle");
      console.log("Error fetching companies", error);
    }
  };
  useEffect(() => {
    if (searchVal.length > 0) {
      updateSearchState("searching");
      handleSearch(searchVal);
      setIsLastPage(true);
    } else {
      fetchCompaniesHandler(searchVal, true);
      setIsLastPage(true);
    }
  }, [searchVal]);

  const handleSearch = useCallback(
    _.debounce((query) => {
      if (query) {
        fetchCompaniesHandler(query, true);
      }
    }, 1000),
    []
  );


  const router = useRouter();
  const handleOnRowClick = (row: any) => {
    router.push(`/company/${row.id}`);
  };
  const columns: GridColDef[] = [
    {
      headerName: "S.no",
      width: 48,
      field: "sNum",
    },
    {
      headerName: "Company Name",
      width: 240,
      field: "companyname",
      renderCell: useCallback(
        (params) => (
          <UserNameWithImage
            imageStyle="!w-10 !h-10"
            image={params?.row?.companylogo}
            name={params?.row?.companyname ?? ""}
            type={"white"}
          />
        ),
        []
      ),
    },
    {
      headerName: "E-mail",
      width: 240,
      field: "companyemail",
    },
    {
      headerName: "Co. registered number",
      width: 220,
      field: "regNo",
    },
    {
      headerName: "Account creation",
      width: 220,
      field: "location",
    },
    {
      headerName: "Action",
      width: 80,
      field: "",
      renderCell: useCallback(
        () => <h1 className="text-sm cursor-pointer text-primary">View</h1>,
        []
      ),
    },
  ];

  const onReachEnd = () => {
    console.log("onReachEnd called");
    if (!isLastPage) {
      fetchCompaniesHandler(searchVal);
    }
  };

  const companyAddHandler = (comp: ICompany) => {
    setCompanies((prev) => {
      return [...prev, comp];
    });
  };

  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader
        withPrimaryButton
        primaryButtonTitle={STRINGS.addCompany}
        onPressButton={() => setShowFormModal(true)}
        title={STRINGS.company}
      />

      {companies && !isLoading && (
        <div className="flex w-full  justify-start items-start pb-6">
          <SearchField
            onPressCross={() => setSearchVal("")}
            onChangeText={(e) => setSearchVal(e.target.value)}
            value={searchVal}
            isLoading={searchState === "searching"}
          />
        </div>
      )}
      <DataTable
        columns={columns}
        rows={companies}
        isLoading={isLoading}
        onPressRow={handleOnRowClick}
        onReachEnd={onReachEnd}
        isLastPage={isLastPage}
        tableHeightPercent={90}
        emptyViewTitle={STRINGS.no_companies}
        emptyViewSubTitle={""}
        illustration={Images.noSubAdmin}
        error={error}
        isDataEmpty={companies.length === 0}
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
