/* eslint-disable @typescript-eslint/no-explicit-any */
import { STRINGS } from "@/constant/en";
import React from "react";
import TableFilter from "../../TableFilter/TableFilter";
import { daysTerm } from "@/app/(home)/types";
import { BarChart, AxisConfig, ChartsAxisProps } from "@mui/x-charts";

const BarsChart = () => {
  return (
    <div className="w-1/2 bg-white shadow-custom-shadow rounded-lg p-4 flex text-text-14 h-fit flex-col">
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
      <div className="w-full">
        <BarChart
          sx={{
            ".MuiChartsLegend-root": {
              display: "none",
            },
            " g clipPath rect": {
              width: "6px !important",
            },
            " g  g rect": {
              width: "6px !important",
            },
          }}
          dataset={[
            { active: 14, inActive: 16 },
            { active: 7, inActive: 4 },
            { active: 37, inActive: 4 },
            { active: 27, inActive: 14 },
            { active: 16, inActive: 24 },
            { active: 10, inActive: 34 },
            { active: 7, inActive: 14 },
          ]}
          borderRadius={8}
          grid={{ horizontal: true }}
          width={590}
          height={195}
          series={[
            {
              dataKey: "active",
              label: STRINGS.active,
              color: "#58D3BE",
            },
            {
              dataKey: "inActive",
              label: STRINGS.inActive,
              color: "#7C839F",
            },
          ]}
          xAxis={[
            {
              data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              scaleType: "band",
              categoryGapRatio: 0.84,
              barGapRatio: 0,
              disableLine: true,
              disableTicks: true,
              tickLabelStyle: {
                fill: "#868686",
              },
            } as unknown as AxisConfig<"band", any, ChartsAxisProps>,
          ]}
          yAxis={[
            {
              disableLine: true,
              disableTicks: true,
              tickLabelStyle: {
                fill: "#868686",
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BarsChart;
