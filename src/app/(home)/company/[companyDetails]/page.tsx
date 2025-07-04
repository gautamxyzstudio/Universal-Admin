/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  ICompanyClientDetails,
  ICompanyDetails,
} from '@/api/fetures/Company/Company.types';
import {
  useLazyGetClosedJobsQuery,
  useLazyGetCompanyClientDetailsQuery,
  useLazyGetCompanyDetailsQuery,
  useLazyGetPostedJobQuery,
} from '@/api/fetures/Company/CompanyApi';
import CustomTab from '@/components/atoms/CustomTab/CustomTab';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import TextGroup from '@/components/organism/TextGroup/TextGroup';
import { STRINGS } from '@/constant/en';
import React, { useEffect, useState } from 'react';
import JobDetails from '@/components/organism/JobDetails/JobDetails';
import ContactDetailCard from '@/components/organism/ContactDetailCard/ContactDetailCard';
import { ITextGroupTypes } from '@/components/organism/TextGroup/TextGroup.types';
import { SxProps } from '@mui/material';
import { Theme } from '@emotion/react';
import CompanyJobsList from './LeftTabViews/CompanyJobsPostList';
import { IJobPost } from '@/api/fetures/Employee/EmployeeApi.types';
import AllClientsList from './LeftTabViews/AllCLientsList';
import ClientDetailsView from './RightTabViews/ClientDetailsViews';
import JobPostEditForm from '@/components/templates/JobPostEditForm/JobPostEditForm';

const CompanyDetails = ({ params }: { params: { companyDetails: string } }) => {
  const [fetchCompanyDetail, { isFetching }] = useLazyGetCompanyDetailsQuery();
  const [companyData, setCompanyData] = useState<ICompanyDetails | null>(null);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  // Open Job
  const [fetchOpenJobs, { isFetching: fetchOpenJobLoading }] =
    useLazyGetPostedJobQuery();
  const [openJob, setOpenJob] = useState<IJobPost[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJobPost | null>(null);

  // Closed Job
  const [fetchClosedJobs, { isFetching: fetchClosedJobLoading }] =
    useLazyGetClosedJobsQuery();
  const [closedJob, setClosedJob] = useState<IJobPost[]>([]);

  // Client Details
  const [fetchCompanyClients, { isFetching: fetchCompanyClientLoading }] =
    useLazyGetCompanyClientDetailsQuery();
  const [clientDetails, setClientDetails] = useState<ICompanyClientDetails[]>(
    []
  );
  const [selectedClient, setSelectedClient] =
    useState<ICompanyClientDetails | null>(null);

  // Tab Selection
  const [selectedTabItemIndex, setSelectedTabItemIndex] = useState(0);

  // Company Details
  const getCompanyDetails = async (id: number) => {
    try {
      const res = await fetchCompanyDetail(id).unwrap();
      if (res) {
        setCompanyData(res);
      }
    } catch (err) {
      console.log('Error in fetching company details', err);
    }
  };
  //Company Client Information
  const getCompanyClients = async (id: number) => {
    try {
      const response = await fetchCompanyClients(id).unwrap();
      if (response.data) {
        setClientDetails(response.data);
        setSelectedClient(response.data[0]);
      }
    } catch (err) {
      console.log('Error in fetching company clients', err);
    }
  };

  // open job details
  const getOpenJob = async (id: number) => {
    setSelectedJob(null);
    try {
      const response = await fetchOpenJobs(id).unwrap();
      if (response.data) {
        setOpenJob(response.data);
        setSelectedJob(response.data[0]);
      }
    } catch (error) {
      console.log('Error in fetching open Job', error);
    }
  };

  // closed job details
  const getClosedJob = async (id: number) => {
    setSelectedJob(null);
    try {
      const response = await fetchClosedJobs(id).unwrap();
      if (response.data) {
        setClosedJob(response.data);
        setSelectedJob(response.data[0]);
      }
    } catch (error) {
      console.log('Error in fetching open Job', error);
    }
  };

  // UseEffect to load the data
  useEffect(() => {
    if (params.companyDetails) {
      getCompanyDetails(parseInt(params.companyDetails));
    }
  }, [params.companyDetails]);

  useEffect(() => {
    if (params.companyDetails && selectedTabItemIndex === 0) {
      getCompanyClients(parseInt(params.companyDetails));
    }
  }, [selectedTabItemIndex === 0]);

  useEffect(() => {
    if (params.companyDetails && selectedTabItemIndex === 1) {
      getOpenJob(parseInt(params.companyDetails));
    }
  }, [selectedTabItemIndex === 1]);

  useEffect(() => {
    if (params.companyDetails && selectedTabItemIndex === 2) {
      getClosedJob(parseInt(params.companyDetails));
    }
  }, [selectedTabItemIndex === 2]);

  // Tabs Data
  const tabsData = [
    {
      label: STRINGS.allClient,
      onClickAction: () => setSelectedTabItemIndex(0),
    },
    {
      label: STRINGS.openJob,
      onClickAction: () => {
        setSelectedTabItemIndex(1);
      },
    },
    {
      label: STRINGS.closeJob,
      onClickAction: () => {
        setSelectedTabItemIndex(2);
      },
    },
  ];

  const menuPressHandler = (option: string) => {
    if (option === STRINGS.close) {
    }
    if (option === STRINGS.edit) {
      setOpenEditForm(true);
    }
  };

  const onPostEditHandler = (data: IJobPost) => {
    if (data.id) {
      setOpenJob((prev) => {
        const prevJobs = [...prev];
        const jIndex = prevJobs.findIndex((j) => j.id === data.id);
        prevJobs[jIndex] = {
          ...prevJobs[jIndex],
          ...data,
          client_details: prevJobs[jIndex].client_details
            ? { ...prevJobs[jIndex].client_details }
            : null,
        };
        setSelectedJob(prevJobs[jIndex]);
        return prevJobs;
      });
    }
  };

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        isLoading={isFetching}
        pageTitle={STRINGS.company}
        name={companyData?.companyname || ''}
      />
      <div className="flex gap-x-10 w-full h-full mt-2">
        {/* Left Side */}
        <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
          <UserNameWithImage
            isLoading={isFetching}
            name={companyData?.companyname || ''}
            image={companyData?.companylogo ?? ''}
            imageStyle="!w-14 !h-14"
            nameStyle="!text-[24px] !leading-[28px]"
          />
          <div className="w-full h-3" />
          <ContactDetailCard
            isLoading={isFetching}
            email={companyData?.companyemail || ''}
            phoneNumber={companyData?.contactno || ''}
            address={companyData?.address || ''}
            link={companyData?.Website || ''}
          />
          <div className="flex gap-x-[13px] flex-wrap border border-borderGrey rounded-lg p-3 text-[16px] leading-[20px] mt-3 w-full">
            <TextGroup
              isLoading={isFetching}
              title={STRINGS.coRegisteredNumber}
              text={companyData?.regNo || ''}
              type={ITextGroupTypes.detailPage}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="52"
              viewBox="0 0 2 52"
              fill="none"
            >
              <path d="M1 1V51" stroke="#DBDBDB" strokeLinecap="round" />
            </svg>
            <TextGroup
              isLoading={isFetching}
              title={STRINGS.gstHSTNumber}
              text={companyData?.gstNo || ''}
              type={ITextGroupTypes.detailPage}
            />
          </div>
          <CustomTab
            tabs={tabsData}
            TabIndicatorProps={{
              style: {
                height: '3px',
                borderTopRightRadius: '3px',
                borderTopLeftRadius: '3px',
              },
            }}
            sx={styles}
          />
          <div className="bg-white border pt-4 border-borderGrey rounded-b-lg h-full w-full">
            {selectedTabItemIndex === 0 && (
              <AllClientsList
                data={clientDetails}
                isLoading={fetchCompanyClientLoading}
                selectedClientId={selectedClient?.id ?? null}
                image={companyData?.companylogo ?? ''}
                onPressButton={(client) => setSelectedClient(client)}
              />
            )}
            {selectedTabItemIndex === 1 && (
              <CompanyJobsList
                data={openJob}
                isLoading={fetchOpenJobLoading}
                selectedPostId={selectedJob?.id ?? null}
                onPressButton={(jobPost) => setSelectedJob(jobPost)}
              />
            )}
            {selectedTabItemIndex === 2 && (
              <CompanyJobsList
                data={closedJob}
                isLoading={fetchClosedJobLoading}
                selectedPostId={selectedJob?.id ?? null}
                onPressButton={(jobPost) => setSelectedJob(jobPost)}
              />
            )}
          </div>
        </div>

        {/* Right Side */}
        {companyData && (
          <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
            {selectedTabItemIndex === 0 && (
              <ClientDetailsView
                data={selectedClient}
                image={companyData.companylogo ?? ''}
              />
            )}
            {(selectedTabItemIndex === 1 || selectedTabItemIndex === 2) && (
              <div className="w-full mb-5 h-full">
                {selectedJob && (
                  <JobDetails
                    onPressMenuItem={menuPressHandler}
                    data={selectedJob}
                    isEmployee={false}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <JobPostEditForm
        show={openEditForm}
        setGlobalModalState={(state) => setOpenEditForm(state)}
        onPostEditHandler={onPostEditHandler}
        currentPost={selectedJob}
      />
    </div>
  );
};

export default CompanyDetails;

const styles: SxProps<Theme> = {
  '&': { paddingX: '12px', paddingTop: '4px' },
  '.MuiButtonBase-root': {
    fontSize: '16px',
    lineHeight: '20px',
    textTransform: 'none',
  },
  '.MuiTabs-flexContainer': { gap: '10px' },
  '.Mui-selected': { fontWeight: 'bold' },
};
