import { daysTerm } from '@/app/(home)/types';
import React from 'react';
import TableFilter from '../../TableFilter/TableFilter';
import { PieChart } from '@mui/x-charts';
import { Skeleton } from '@mui/material';

type DoughnutChartProps = {
  data: {
    id: number;
    label: string;
    customColor: string;
    value: number;
    color: string;
  }[];
  selectedValue?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  getSelectedValue?: (
    menuItem: 'daily' | 'weekly' | 'monthly' | 'yearly'
  ) => void;
  heading: string;
  showFilter?: boolean;
  isLoading?: boolean;
};

const DoughnutChart = ({
  data,
  heading,
  selectedValue,
  isLoading = false,
  showFilter = true,
  getSelectedValue,
}: DoughnutChartProps) => {
  if (isLoading) {
    return (
      <div className="w-1/2 bg-white h-72 shadow-custom-shadow rounded-lg p-4 flex flex-col ">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-white shadow-custom-shadow rounded-lg p-4 flex flex-col h-72">
      <div className="flex relative justify-between mb-6 w-full items-center">
        <span className="text-Black text-text-md">{heading}</span>
        <div className="absolute right-2 top-2">
          {showFilter && (
            <TableFilter
              data={daysTerm}
              selectedValue={selectedValue}
              initialSelectedOption={daysTerm[1]}
              menuButtonStyle="!rounded-[80px] !px-[11px] !py-[7px] !text-primary !text-text-14"
              getSelectedValue={getSelectedValue}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center w-full h-fit gap-x-5">
        <div className="flex flex-col gap-y-8 w-1/2">
          {data &&
            data.map((item) => {
              return (
                <div key={item.id} className="flex flex-col gap-y-1 w-full">
                  <div className="flex gap-x-2 items-center text-text-md text-Black">
                    <div
                      className={`w-3 h-3 rounded-full ${item.customColor}`}
                    />
                    {item.label}
                  </div>
                  <span className="text-disable text-text-12 lowercase ml-5">
                    {item.value} {item.label}
                  </span>
                </div>
              );
            })}
        </div>
        <div className="w-[300px] h-[200px] flex items-center justify-center">
          <PieChart
            series={[
              {
                data: data,
                innerRadius: 90,
                outerRadius: 60,
              },
            ]}
            margin={{ right: 0 }}
            height={180}
            width={180}
            legend={{
              hidden: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
