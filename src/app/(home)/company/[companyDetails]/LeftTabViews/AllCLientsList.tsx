/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import VirtualList from "@/components/molecules/VirtualList/VirtualList";
import React, { useCallback, useEffect, useState } from "react";
import TabButton from "@/components/molecules/ButtonTypes/TabButton/TabButton";
import { useDemoData } from "@mui/x-data-grid-generator";
import { STRINGS } from "@/constant/en";
import { Images } from "../../../../../../public/exporter";
import { Skeleton } from "@mui/material";
import UserNameWithImage from "@/components/molecules/UserNameWithImage/UserNameWithImage";
import { ICompanyClientDetails } from "@/api/fetures/Company/Company.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type IAllClientsListProps = {
  data: ICompanyClientDetails[];
  isLoading: boolean;
  selectedClientId: number | null;
  image: StaticImport | string | null;
  onPressButton: (
    post: ICompanyClientDetails,
    image: StaticImport | string | null
  ) => void;
};

const AllClientsList: React.FC<IAllClientsListProps> = ({
  data,
  isLoading,
  selectedClientId,
  image,
  onPressButton,
}) => {
  const [clients, setclients] = useState<ICompanyClientDetails[]>([]);
  const { data: demoData } = useDemoData({
    rowLength: 5,
    maxColumns: 9,
    dataSet: "Employee",
  });
  useEffect(() => {
    if (data) {
      setclients(data);
    }
  }, [data]);

  const renderItemLoading = () => {
    return (
      <TabButton
        content={
          <>
            <Skeleton variant="circular" width={56} height={56} />
            <Skeleton variant="text" width="80%" height={40} />
          </>
        }
        isSelected={false}
      ></TabButton>
    );
  };

  const renderItem = useCallback(
    (_: number, item: ICompanyClientDetails) => {
      return (
        <TabButton
          key={item.id}
          content={
            <UserNameWithImage
              name={item.clientName ?? ""}
              image={image ?? ""}
              imageStyle="!w-14 !h-14"
            />
          }
          isSelected={selectedClientId === item.id}
          onPressButton={() => onPressButton(item, image)}
        />
      );
    },
    [selectedClientId, data]
  );

  return (
    <div className="h-full pb-4 w-full">
      <VirtualList
        data={isLoading ? demoData.rows : clients}
        isLastPage={true}
        illustration={Images.noJobs}
        illustrationStyes="!w-40 !h-40"
        emptyViewTitle={STRINGS.noJobsCompleted}
        isDataEmpty={clients.length == 0}
        emptyViewSubTitle=""
        renderItem={isLoading ? (renderItemLoading as any) : renderItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AllClientsList;
