/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  useChangeClientStatusMutation,
  useGetClientDetailsQuery,
  useLazyGetPostedJobByClientQuery,
} from '@/api/fetures/Client/ClientApi';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import ContactDetailCard from '@/components/organism/ContactDetailCard/ContactDetailCard';
import PageSubHeader from '@/components/organism/PageSubHeader/PageSubHeader';
import { STRINGS } from '@/constant/en';
import { dateMonthFormat, withAsyncErrorHandlingPost } from '@/utility/utils';
import React, { useEffect, useState } from 'react';
import { IClientStatus } from '@/constant/enums';
import CustomTab from '@/components/atoms/CustomTab/CustomTab';
import { Theme } from '@emotion/react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
} from '@mui/material';
import EmployeeJobsList from '../../employeeManagement/[employeeDetails]/LeftTabViewss/EmployeeJobsList';
import { IJobPost } from '@/api/fetures/Employee/EmployeeApi.types';
import JobDetails from '@/components/organism/JobDetails/JobDetails';
import { useShowLoaderContext } from '@/contexts/LoaderContext/LoaderContext';
import { useSnackBarContext } from '@/providers/SnackbarProvider';
import { IClientDetailsResponse } from '@/api/fetures/Client/Client.types';
import JobPostEditForm from '@/components/templates/JobPostEditForm/JobPostEditForm';

const ClientDetails = ({ params }: { params: { clientDetails: string } }) => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const { data, isLoading } = useGetClientDetailsQuery(params.clientDetails);
  const { changeLoaderState } = useShowLoaderContext();
  const { displaySnackbar } = useSnackBarContext();
  const [client, setClient] = useState<IClientDetailsResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<IClientStatus | null>(null);
  const [updateClientStatus, { isLoading: isLoadingStatus }] =
    useChangeClientStatusMutation();
  const [clientJobs, setClientJobs] = useState<IJobPost[]>([]);
  const [selectedJobPost, setSelectedJobPost] = useState<IJobPost | null>(null);
  const [fetchClientJobs, { isFetching: isClientJobFecthing }] =
    useLazyGetPostedJobByClientQuery();

  // Update status when data changes
  useEffect(() => {
    if (data) {
      setClient(data);
      setStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    changeLoaderState(isLoadingStatus);
  }, [isLoadingStatus]);

  useEffect(() => {
    if (params.clientDetails) {
      getClientJobsHandler();
    }
  }, [params.clientDetails]);

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
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setStatus(e.target.value as IClientStatus);
      const response = await updateClientStatus({
        status: e.target.value as IClientStatus,
        clientId: parseInt(params.clientDetails),
      });
      if (response) {
        setClient((prev) => {
          if (!prev) {
            return null;
          }
          return {
            ...prev,
            status: e.target.value as IClientStatus,
          };
        });
        displaySnackbar('success', 'Status updated successful');
      }
    }
  );

  const tabsData = [
    {
      label: STRINGS.postJobs,
    },
  ];

  const menuPressHandler = (option: string) => {
    if (option === STRINGS.edit) {
      setOpenEditForm(true);
    }
  };

  const onPostEditHandler = (data: IJobPost) => {
    if (data.id) {
      setClientJobs((prev) => {
        const prevJobs = [...prev];
        const jIndex = prevJobs.findIndex((j) => j.id === data.id);
        prevJobs[jIndex] = {
          ...prevJobs[jIndex],
          ...data,
          client_details: prevJobs[jIndex].client_details
            ? { ...prevJobs[jIndex].client_details }
            : null,
        };
        setSelectedJobPost(prevJobs[jIndex]);
        return prevJobs;
      });
    }
  };

  return (
    <div className="w-full h-[90%]">
      <PageSubHeader
        isLoading={isLoading}
        pageTitle={STRINGS.clientManagement}
        name={client?.name || ''}
      />
      <div className="flex gap-x-10 w-full h-full mt-2">
        <div className="flex flex-col w-[36.4%] overflow-scroll scrollbar-none">
          <div className="flex w-full  flex-col justify-between h-fit mb-3">
            <UserNameWithImage
              name={client?.name || ''}
              isLoading={isLoading}
              image={client?.companyLogo ?? ''}
              imageStyle="!w-14 !h-14"
              companyName={client?.companyName || ''}
              companyNameStyle="!text-[14px] !leading-[18px] !w-fit"
              joinDate={dateMonthFormat(client?.createdAt ?? new Date()) ?? ''}
            />
            <div className="w-[40%] py-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  key={`${client?.id}-status-select`}
                  sx={{
                    '&.mui-1a45cac-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
                      {
                        padding: '12px 12px',
                      },
                  }}
                  labelId="demo-simple-select-label"
                  id={`${client?.id}-status-select`}
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value={IClientStatus.ACTIVE}>Active</MenuItem>
                  <MenuItem value={IClientStatus.INACTIVE}>Inactive</MenuItem>
                  <MenuItem value={IClientStatus.PENDING}>Pending</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <ContactDetailCard
            email={client?.email || ''}
            isLoading={isLoading}
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
              <JobDetails
                data={selectedJobPost}
                isEmployee={false}
                onPressMenuItem={menuPressHandler}
              />
            )}
          </div>
        </div>
      </div>
      <JobPostEditForm
        show={openEditForm}
        setGlobalModalState={(state) => setOpenEditForm(state)}
        onPostEditHandler={onPostEditHandler}
        currentPost={selectedJobPost}
      />
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
