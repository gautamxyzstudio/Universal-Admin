import React from "react";
import Image from "next/image";
import { STRINGS } from "@/constant/en";
import { IInfoCardProps } from "./InfoCard.types";
import { Icons } from "../../../../public/exporter";
const InfoCard: React.FC<IInfoCardProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        const indexVal = index + 1;
        const bgColor = indexVal % 2 === 0 ? "bg-bgGreenWave" : "bg-bgRedWave";
        const weekColor = indexVal % 2 === 0 ? "text-Green" : "text-Red";
        const icon = indexVal % 2 === 0 ? Icons.graphUp : Icons.graphDown;
        return (
          <div
            key={indexVal}
            className="w-full bg-white shadow-custom-shadow rounded-lg border border-backgroundLight"
          >
            <div className="pt-3 px-4 flex justify-between items-start">
              <div className="flex flex-col gap-y-1">
                <span className="text-text-md text-Black">{item.label}</span>
                <span className="text-[24px] leading-8 font-bold text-primary">
                  {item.value}
                </span>
              </div>
              <Image src={item.icon} alt={item.label} />
            </div>
            <div
              className={
                bgColor +
                " bg-cover bg-no-repeat w-full h-12 px-4 pb-3 pt-5 text-text-12 text-disable inline-flex items-center gap-x-1"
              }
            >
              <Image src={icon} alt="graph" />
              <span className={weekColor}>{item.weekPercentage}</span>{" "}
              {STRINGS.compareWeek}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default InfoCard;
