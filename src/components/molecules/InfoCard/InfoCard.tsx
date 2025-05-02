import React from 'react';
import Image from 'next/image';
import { STRINGS } from '@/constant/en';
import { IInfoCardProps } from './InfoCard.types';
import { Icons } from '../../../../public/exporter';
import { Skeleton } from '@mui/material';
const InfoCard: React.FC<IInfoCardProps> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full gap-x-4 flex justify-center items-center">
        {[1, 2, 3, 4].map((item) => {
          return (
            <div
              key={item}
              className="w-full  h-32 bg-white shadow-custom-shadow rounded-lg border border-backgroundLight"
            >
              <div className="p-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {items.map((item) => {
        const value = parseFloat(item.value);
        const bgColor =
          value >= 0 && item.label !== STRINGS.pendingReq
            ? 'bg-bgGreenWave'
            : 'bg-bgRedWave';
        const weekColor =
          value >= 0 && item.label !== STRINGS.pendingReq
            ? 'text-Green'
            : 'text-Red';
        const icon =
          value >= 0 && item.label !== STRINGS.pendingReq
            ? Icons.graphUp
            : Icons.graphDown;
        return (
          <div
            key={item.label}
            className="w-full h-32 bg-white shadow-custom-shadow rounded-lg border border-backgroundLight"
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
                ' bg-cover bg-no-repeat w-full h-12 px-4 pb-3 pt-5 text-text-12 text-disable inline-flex items-center gap-x-1'
              }
            >
              <Image src={icon} alt="graph" />
              <span className={weekColor}>{item.weekPercentage}</span>{' '}
              {STRINGS.compareWeek}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default InfoCard;
