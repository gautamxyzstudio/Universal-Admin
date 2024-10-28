import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import { STRINGS } from "@/constant/en";
import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import UserNameWithImage from "../UserNameWithImage/UserNameWithImage";
import { ISelectedListProps } from "./SelectedList.types";
import EmptyScreenView from "@/components/templates/EmptyScreenView/EmptyScreenView";
import { useDemoData } from "@mui/x-data-grid-generator";

const SelectedList: React.FC<ISelectedListProps> = ({
  datas,
  isLoading,
  onReachEnd,
  headerView,
  emptyViewSubTitle,
  emptyViewTitle,
  illustration,
  error,
  isDataEmpty,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected row ID
  const isButtonEnabled = selectedId !== null;

  const toggleSelect = (id: number) => {
    setSelectedId(id);
  };

  const {data} = useDemoData({
    rowLength: 10,
    maxColumns: 1,
    dataSet: 'Employee',
  })

  return (
    <>
      {datas.length > 0 && <div className="w-full">{headerView}</div>}
      
      {isLoading ? (
        <Virtuoso data={data.rows} itemContent={(index,)=>{
            return (
              <div key={index} className="flex w-full  my-2 mx-6">
                <div className="animate-pulse w-12 h-12 bg-primary  flex items-center justify-center" />
              </div>
            );
  
        }}/>
       
      ) : datas.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <EmptyScreenView
            emptyViewTitle={emptyViewTitle}
            emptyViewSubTitle={emptyViewSubTitle}
            illustration={illustration}
            error={error}
            isDataEmpty={isDataEmpty}
          />
        </div>
      ) : (
        <>
          <Virtuoso
            data={datas}
            endReached={onReachEnd}
            style={{
              scrollbarWidth: "none",
              cursor: "pointer",
            }}
            itemContent={(index, data) => {
              const isSelected = selectedId === data.id;
              const bgColor = isSelected ? "bg-lightPrimary" : "bg-white";
              return (
                <div
                  className={"px-6 py-3 " + bgColor}
                  onClick={() => toggleSelect(data.id)}
                >
                  <UserNameWithImage
                    key={index}
                    name={data.companyname ?? ""}
                    image={data.companylogo}
                  />
                </div>
              );
            }}
          />
          <div className="bg-white px-6 pt-4 pb-6">
            <CustomButton
              fullWidth
              disabled={!isButtonEnabled}
              title={STRINGS.confirm}
              onClick={() => console.log("Confirmed selection:", selectedId)}
              buttonType={"primary-small"}
              variant={"contained"}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SelectedList;
