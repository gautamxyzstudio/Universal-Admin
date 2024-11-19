/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import { STRINGS } from "@/constant/en";
import React, { useCallback, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import UserNameWithImage from "../UserNameWithImage/UserNameWithImage";
import { ISelectedListProps } from "./SelectedList.types";
import EmptyScreenView from "@/components/templates/EmptyScreenView/EmptyScreenView";
import { useDemoData } from "@mui/x-data-grid-generator";
import { ICompany } from "@/api/fetures/Company/Company.types";
import IconWithText from "../IconWithText/IconWithText";
import { Icons } from "../../../../public/exporter";
import ConfirmationDialog from "../DialogTypes/ConfirmationDialog/ConfirmationDialog";

const SelectedList: React.FC<ISelectedListProps> = ({
  lists,
  isLoading,
  onReachEnd,
  headerView,
  emptyViewSubTitle,
  emptyViewTitle,
  illustration,
  error,
  isDataEmpty,


}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isButtonEnabled = selectedId !== null;
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);

  const toggleSelect = (id: number) => {
    setSelectedId(id);
  };

  const { data } = useDemoData({
    rowLength: 8,
    maxColumns: 1,
    dataSet: "Commodity",
  });

  const renderItemContent = useCallback(
    (company: ICompany) => {
      const isSelected = selectedId === company.id;
      const bgColor = isSelected ? "bg-lightPrimary" : "bg-white";

      return (
        <div
          key={company.id}
          className={"px-6 py-3 " + bgColor}
          onClick={() => toggleSelect(company.id)}
        >
          <UserNameWithImage
            imageStyle="!w-9 !h-9"
            nameStyle=""
            name={company.companyname ?? ""}
            companyNameStyle="text-disable text-[12px] leading-4"
            companyName={company.Industry ?? ""}
            image={company.companylogo}
          />
          <div className="ml-2 mt-2 flex flex-col gap-y-1">
            <IconWithText
              textStyle="text-[12px] leading-4"
              iconStyle="!w-4 !h-4"
              text={company.companyemail ?? ""}
              icon={Icons.emailIcon}
            />
            <IconWithText
              textStyle="text-[12px] leading-4"
              iconStyle="!w-4 !h-4"
              text={company.address ?? ""}
              icon={Icons.locationPin}
            />
          </div>
        </div>
      );
    },
    [selectedId]
  );

  const renderLoadingItem = useCallback(
    (index: number) => (
      <div key={index} className="flex w-full py-2 px-6">
        <div className="animate-pulse w-full h-12 flex items-center justify-start gap-2">
          <div className="animate-pulse w-9 h-9 rounded-full bg-slate-300 flex" />
          <div className="animate-pulse w-full h-9 rounded bg-slate-300" />
        </div>
      </div>
    ),
    []
  );

  const handleConfirmation = () => {
    console.log("Confirmed selection:", lists[`${selectedId}`]);
    setShowConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setTimeout(() => setShowConfirmationDialog(false), 1000);
  };
  return (
    <>
      {lists.length > 0 && <div className="w-full">{headerView}</div>}
      {isLoading ? (
        <Virtuoso data={data.rows} itemContent={renderLoadingItem} />
      ) : lists.length == 0 ? (
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
            data={lists}
            endReached={onReachEnd}
            style={{
              scrollbarWidth: "none",
              cursor: "pointer",
            }}
            itemContent={(index) => renderItemContent(lists[index])}
          />
          <div className="bg-white px-6 pt-4 pb-6">
            <CustomButton
              fullWidth
              disabled={!isButtonEnabled}
              title={STRINGS.confirm}
              onClick={handleConfirmation}
              buttonType={"primary-small"}
              variant={"contained"}
            />
          </div>
        </>
      )}

      <ConfirmationDialog
        type={"success"}
        title={STRINGS.verified}
        description={STRINGS.verifiedClient}
        onClose={handleCloseDialog}
        open={showConfirmationDialog}
      />
    </>
  );
};

export default SelectedList;
