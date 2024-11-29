'use client';
import {
  useChangeClientStatusMutation,
  useGetClientDetailsQuery,
  useLazyGetPostedJobByClientQuery,
} from '@/api/fetures/Client/ClientApi';
import Switch from '@/components/atoms/Switch/Switch';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import ContactDetailCard from '@/components/organism/ContactDetailCard/ContactDetailCard';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import { STRINGS } from '@/constant/en';
import { dateMonthFormat, withAsyncErrorHandlingPost } from '@/utility/utils';
import React, { useEffect, useState } from 'react';
import { getClientStatusAttributesFromType } from '../types';
import { IClientStatus } from '@/constant/enums';
import CustomTab from '@/components/atoms/CustomTab/CustomTab';
import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import EmployeeJobsList from '../../employeeManagement/[employeeDetails]/LeftTabViewss/EmployeeJobsList';
import { IJobPost } from '@/api/fetures/Employee/EmployeeApi.types';
import JobDetails from '@/components/organism/JobDetails/JobDetails';
import { IClientDetailsResposne } from '@/api/fetures/Client/Client.types';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
// import { IClientDetailsResposne } from "@/api/fetures/Client/Client.types";

const ClientDetails = ({ params }: { params: { clientDetails: string } }) => {
  const { data, isFetching } = useGetClientDetailsQuery(params.clientDetails);
  const { changeLoaderState } = useShowLoaderContext();
  const { displaySnackbar } = useSnackBarContext();
  const [client, setClient] = useState<IClientDetailsResposne | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateClientStatus, { isLoading }] = useChangeClientStatusMutation();
  const [clientJobs, setClientJobs] = useState<IJobPost[]>([]);
  const [selectedJobPost, setSelectedJobPost] = useState<IJobPost | null>(null);
  const [fetchClientJobs, { isFetching: isClientJobFecthing }] =
    useLazyGetPostedJobByClientQuery();

  // Update status when data changes
  useEffect(() => {
    if (data) {
      setClient(data);
    }
  }, [data]);

  useEffect(() => {
    changeLoaderState(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (params.clientDetails) {
      getClientJobsHandler();
    }
  }, [params.clientDetails]);

  const statusAttributes = getClientStatusAttributesFromType(
    client?.status ?? IClientStatus.INACTIVE
  );

  const getClientJobsHandler = async () => {
    try {
      const clientJobs = await fetchClientJobs({
        page: currentPage,
        clientId: parseInt(params.clientDetails),
      }).unwrap();
      if (clientJobs) {
        setClientJobs(clientJobs.data);
        setSelectedJobPost(clientJobs.data[0]);
        setCurrentPage(clientJobs.pagination?.page ?? 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleStatusChange = withAsyncErrorHandlingPost(
    async (event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
      const newStatus = isChecked
        ? IClientStatus.ACTIVE
        : IClientStatus.INACTIVE;

      const response = await updateClientStatus({
        status: newStatus,
        clientId: parseInt(params.clientDetails),
      });
      if (response) {
        setClient((prev) => {
          if (!prev) {
            return null;
          }
          return {
            ...prev,
            status: newStatus,
          };
        });
        displaySnackbar('success', 'Status updated successful');
      }
    },
    displaySnackbar
  );

  const tabsData = [
    {
      label: STRINGS.postJobs,
    },
  ];

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        isLoading={isFetching}
        pageTitle={STRINGS.clientManagement}
        name={client?.name || ''}
      />
      <div className="flex gap-x-10 w-full h-[-webkit-fill-available] mt-2">
        <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
          <div className="flex justify-between h-fit mb-3">
            <UserNameWithImage
              name={client?.name || ''}
              isLoading={isFetching}
              image={client?.companyLogo ?? ''}
              imageStyle="!w-14 !h-14"
              companyName={client?.companyName || ''}
              companyNameStyle="!text-[14px] !leading-[18px] !w-fit"
              joinDate={dateMonthFormat(client?.createdAt ?? new Date()) ?? ''}
            />
            <Switch
              checked={client?.status === IClientStatus.ACTIVE ? true : false}
              onChange={handleStatusChange}
              label={statusAttributes?.text}
              switchClassName={'justify-end !flex-col !w-fit'}
              className={` -mt-[10px] text-[8px] leading-3 ${statusAttributes?.styles}`}
            />
          </div>
          <ContactDetailCard
            email={client?.email || ''}
            isLoading={isFetching}
            phoneNumber={client?.contactNo || ''}
            address={client?.location || ''}
            department={client?.industry || ''}
          />
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
            <EmployeeJobsList
              data={clientJobs}
              isLoading={isClientJobFecthing}
              selectedPostId={selectedJobPost?.id ?? null}
              onPressButton={(post) => setSelectedJobPost(post)}
            />
          </div>
        </div>
        <div className="flex w-[63.6%] bg-white border border-borderGrey rounded-lg mt-4 p-6 overflow-scroll scrollbar-none">
          <div className="w-full mb-5 h-full">
            {selectedJobPost && (
              <JobDetails data={selectedJobPost} isEmployee={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;

const styles: SxProps<Theme> = {
  '&': {
    paddingX: '12px',
    paddingTop: '4px',
  },
  '.MuiButtonBase-root': {
    fontSize: '16px',
    lineHeight: '20px',
    textTransform: 'none',
  },
  '.MuiTabs-flexContainer': {
    gap: '10px',
  },
  '.Mui-selected': {
    fontWeight: 'bold',
  },
};
