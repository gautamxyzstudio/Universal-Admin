'use client';
import { STRINGS } from '@/constant/en';
import { Icons } from '../../../public/exporter';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import DataTable from '@/components/atoms/DataTable/DataTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  useGetAllUsersQuery,
  useGetAnalyticsQuery,
} from '@/api/fetures/Users/UsersApi';
import { getUsersType } from '@/constant/constant';
import { useEffect, useState } from 'react';
import { IUsers } from '@/api/fetures/Users/UsersApi.types';

import { useRouter } from 'next/navigation';
import { routeNames } from '@/utility/routesName';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import DoughnutChart from '@/components/molecules/ChartTypes/DoughnutChart/DoughnutChart';
import InfoCard from '@/components/molecules/InfoCard/InfoCard';
import { ICustomErrorResponse } from '@/api/types';

export default function Home() {
  const route = useRouter();
  const { data, isFetching, error: usersError } = useGetAllUsersQuery('');
  const [selectedValue, setSelectedValue] = useState<
    'weekly' | 'monthly' | 'yearly' | 'daily'
  >('daily');
  const {
    data: analyticsData,
    isFetching: isFetchingAnalytics,
    error: analyticsError,
  } = useGetAnalyticsQuery(
    { type: selectedValue },
    { refetchOnMountOrArgChange: true }
  );

  const [users, setUsers] = useState<IUsers[]>([]);
  // const [openSpeedDial, setOpenSpeedDial] = useState(false);

  useEffect(() => {
    if (data) {
      const user = data.data.slice(0, 10);
      console.log(user);
      setUsers(user);
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'createdAt',
      headerName: STRINGS.date,
      width: 88,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: 'name',
      headerName: STRINGS.name,
      width: 240,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <UserNameWithImage
            name={params.row.employee?.name ?? params.row.client?.name}
            image={
              params.row.employee?.employeeImage ??
              params.row.client?.clientCompanyLogo
            }
            imageStyle="!w-8 !h-8 object-cover"
            type={'orange'}
          />
        );
      },
    },
    {
      field: 'email',
      headerName: STRINGS.email,
      width: 220,
    },
    {
      field: 'contact',
      headerName: STRINGS.contactNumber,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            {params.row.employee && params.row.employee.contactNumber}
            {params.row.client && params.row.client.contactNumber}
          </>
        );
      },
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return getUsersType(params.row.role);
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span
            onClick={() => {
              if (params.row.employee) {
                route.push(`${routeNames.Employees}/${params.row.employee.id}`);
              }
              if (params.row.client) {
                route.push(`${routeNames.Client}/${params.row.client.id}`);
              }
            }}
            className="text-primary sticky"
          >
            {STRINGS.view}
          </span>
        );
      },
    },
  ];

  // const handleOnClickSpeedDial = () => {
  //   setOpenSpeedDial((prevOpenSpeedDial) => !prevOpenSpeedDial);
  // };

  const pieData = [
    {
      id: 1,
      label: STRINGS.jobPosting,
      value: Number(analyticsData?.openJobs ?? 0),
      color: '#FFA600',
      customColor: 'bg-pieChartJob',
    },
    {
      id: 2,
      label: STRINGS.newEmp,
      value: Number(analyticsData?.newEmployees ?? 0),
      color: '#00B2Db',
      customColor: 'bg-pieChartEmp',
    },
    {
      id: 3,
      label: STRINGS.newClient,
      value: Number(analyticsData?.newClients ?? 0),
      color: '#0023B9',
      customColor: 'bg-pieChartClient',
    },
  ];

  const infoCardItems = [
    {
      label: 'New Clients',
      value: analyticsData?.totalClients,
      icon: Icons.newClient,
      weekPercentage: `${analyticsData?.clientChange}%`,
    },
    {
      label: 'Total Employees',
      value: analyticsData?.totalEmployees,
      icon: Icons.employee,
      weekPercentage: `${analyticsData?.employeeChange}%`,
    },
    {
      label: STRINGS.pendingReq,
      value: analyticsData?.pendingRequests ?? 0,
      icon: Icons.pending,
      weekPercentage: `${analyticsData?.pendingRequestChange}%`,
    },
    {
      label: 'Job opening',
      value: analyticsData?.openJobs,
      icon: Icons.job,
      weekPercentage: `${analyticsData?.totalJobsChange}%`,
    },
  ];

  const analyticsDataPie = [
    {
      id: 2,
      label: STRINGS.totalEmployees,
      value: Number(analyticsData?.totalEmployees ?? 0),
      color: '#00B2Db',
      customColor: 'bg-pieChartEmp',
    },
    {
      id: 3,
      label: STRINGS.totalClients,
      value: Number(analyticsData?.totalClients ?? 0),
      color: '#0023B9',
      customColor: 'bg-pieChartClient',
    },
  ];

  // Error handling logic
  const renderError = (error: ICustomErrorResponse) => {
    if (error) {
      return (
        <div className="text-red-500">
          Error: {error.message || 'An error occurred'}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" w-full h-full overflow-scroll scrollbar-none">
      <div className="flex justify-between items-center w-full">
        <PageHeader title={STRINGS.dashboard} />
        {/* <div
          className={`inline-flex gap-x-6 items-center ${
            openSpeedDial ? 'w-[10%]' : 'w-[17%]'
          } h-[60px]`}
        >
          <CustomSpeedDial
            open={openSpeedDial}
            onClickSpeedDial={handleOnClickSpeedDial}
          />
        </div> */}
      </div>
      <div className="flex gap-x-4 w-full">
        {renderError(usersError)}
        {renderError(analyticsError)}
        <InfoCard
          isLoading={isFetchingAnalytics}
          items={infoCardItems.map((item) => ({
            ...item,
            value: item.value?.toString() ?? '0',
          }))}
        />
      </div>
      <div className="flex gap-x-4 my-4 w-full">
        <DoughnutChart
          isLoading={isFetchingAnalytics}
          showFilter={false}
          data={analyticsDataPie}
          heading={STRINGS.analytics}
        />
        <DoughnutChart
          isLoading={isFetchingAnalytics}
          data={pieData}
          getSelectedValue={setSelectedValue}
          heading={STRINGS.activity}
          selectedValue={selectedValue}
        />
      </div>
      <div className="w-full h-[70%]">
        <DataTable
          columns={columns}
          rows={users}
          isLoading={isFetching}
          withPagination={false}
          tableHeightPercent={85}
          headerView={
            <span className="text-Black text-text-md">{STRINGS.recentAct}</span>
          }
        />
      </div>
    </div>
  );
}
