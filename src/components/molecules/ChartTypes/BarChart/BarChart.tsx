import { STRINGS } from "@/constant/en";
import React from "react";
import TableFilter from "../../TableFilter/TableFilter";
import { daysTerm } from "@/app/(home)/employeeManagement/types";

const BarChart = () => {
  return (
    <div className="w-1/2 bg-white shadow-custom-shadow rounded-lg p-4 flex text-text-14 h-fit">
      <div className="flex justify-between mb-6 w-full items-center">
        <div className="flex flex-col gap-y-2">
          <span className="text-Black text-text-md">{STRINGS.jobStatus}</span>
          <div className="flex gap-x-4 items-center text-disable text-text-12">
            <div className="flex gap-x-2 items-center">
              <div className="w-3 h-3 bg-barChartActive rounded-full" />
              {STRINGS.active}
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="w-3 h-3 bg-barChartInActive rounded-full" />
              {STRINGS.inActive}
            </div>
          </div>
        </div> 
          <TableFilter
            data={daysTerm}
            initialSelectedOption={daysTerm[1]}
            menuButtonStyle="!rounded-[80px] !px-[11px] !py-[7px] !text-primary !text-text-14"
          /> 
      </div>
    </div>
  );
};

export default BarChart;
