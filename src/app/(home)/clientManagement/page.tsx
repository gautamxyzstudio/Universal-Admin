"use client"
import { ICompany } from '@/api/fetures/Company/Company.types';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import AddCompanyList from '@/components/templates/AddCompanyList/AddCompanyList';
import { STRINGS } from '@/constant/en';
import React, { useState } from 'react';

const ClientManagement = () => {
  const [listData, setListData] = useState(false)
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const companyAddHandler = (comp: ICompany) => {
    setCompanies((prev) => {
      return [...prev, comp];
    });
  };
  return (
    <div className="w-full h-[85%] mb-5">
      <PageHeader title={STRINGS.clientManagement} withSecondaryButton secondaryButtonTitle={STRINGS.pendingReq + " (48)"} onPressButton={()=>setListData(true)}/>
    <AddCompanyList show={listData} handleClose={undefined}/>
    </div>
  );
};

export default ClientManagement;
