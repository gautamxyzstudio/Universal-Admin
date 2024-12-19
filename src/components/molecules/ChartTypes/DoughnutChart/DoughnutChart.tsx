import { daysTerm } from "@/app/(home)/types";
import React from "react";
import TableFilter from "../../TableFilter/TableFilter";
import { STRINGS } from "@/constant/en";
import { PieChart } from "@mui/x-charts";

const DoughnutChart = () => {
  const data = [
    {
      id: 1,
      label: STRINGS.jobPosting,
      value: 100,
      color: "#FFA600",
      customColor: "bg-pieChartJob",
    },
    {
      id: 2,
      label: STRINGS.newEmp,
      value: 300,
      color: "#00B2Db",
      customColor: "bg-pieChartEmp",
    },
    {
      id: 3,
      label: STRINGS.newClient,
      value: 300,
      color: "#0023B9",
      customColor: "bg-pieChartClient",
    },
  ];
  return (
    <div className="w-1/2 bg-white shadow-custom-shadow rounded-lg p-4 flex flex-col h-fit">
      <div className="flex justify-between mb-6 w-full items-center">
        <span className="text-Black text-text-md">{STRINGS.activity}</span>
        <TableFilter
          data={daysTerm}
          initialSelectedOption={daysTerm[1]}
          menuButtonStyle="!rounded-[80px] !px-[11px] !py-[7px] !text-primary !text-text-14"
        />
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
