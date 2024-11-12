"use client";
import React, { createContext } from "react";
import {
  ICompanyDetailsContextProps,
  ICompanyDetailsContextProviderProps,
} from "./CompanyDetailsContext.types";
import { ICompany } from "@/api/fetures/Company/Company.types";

const CompanyDetailsContext = createContext<ICompanyDetailsContextProps | null>(
  null
);
const CompanyDetailsContextProvider: React.FC<
  ICompanyDetailsContextProviderProps
> = ({ children }) => {
  const [companyData, setCompanyData] = React.useState<ICompany | null>(null);

  const onClickRowHandler = (companyDetail?: ICompany) => {
    if (companyDetail) {
      setCompanyData(companyDetail);
    }
  };

  const contextValue: ICompanyDetailsContextProps = {
    onClickRow: onClickRowHandler,
    companyDetail: companyData,
  };
  return (
    <CompanyDetailsContext.Provider value={contextValue}>
      {children}
    </CompanyDetailsContext.Provider>
  );
};

export default CompanyDetailsContextProvider;

export const useGetCompanyDetailsContext = () => {
  const context = React.useContext(CompanyDetailsContext);
  if (!context) {
    throw new Error("CompanyDetailsContext is not available");
  }
  return context;
};
