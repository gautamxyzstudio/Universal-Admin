/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomMenuComponent from "@/components/atoms/CustomMenuComponent/CustomMenuComponent";
import CustomTab from "@/components/atoms/CustomTab/CustomTab";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import PageHeader from "@/components/organism/PageHeader/PageHeader";
import { STRINGS } from "@/constant/en";
import { Theme } from "@emotion/react";
import { Badge, SxProps } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { Icons, Images } from "../../../../public/exporter";
import EmptyScreenView from "@/components/templates/EmptyScreenView/EmptyScreenView";
import MessageCard from "@/components/organism/MessageCard/MessageCard";
import { useLazyGetHelpIssuesQuery } from "@/api/fetures/HelpIssue/HelpIssueApi";
import { IIssueRaisedByEmployee } from "@/api/fetures/HelpIssue/HelpIssueApi.types";
import _ from "lodash";
import MessageCardsList from "./LeftTabViews/MessageCardsList";

const HelpAndSupport = () => {
  // Tab Selection
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [fetchHelpIssue, { data, isFetching, error }] =
    useLazyGetHelpIssuesQuery();
  const [issueMessage, setIssueMessage] = useState<IIssueRaisedByEmployee[]>(
    data?.data ?? []
  );
  const [selectedMessage, setSelectedMessage] =
    useState<IIssueRaisedByEmployee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchState, updateSearchState] = useState<"idle" | "searching">(
    "idle"
  );
  const [searchVal, setSearchVal] = useState("");

  const getIssueMessage = async (searchVal: string, page: number) => {
    try {
      const fetchHelpIssueResponse = await fetchHelpIssue({
        searchVal: searchVal,
        pageNo: page,
      }).unwrap();
      console.log(fetchHelpIssueResponse, "Full fetchHelpIssueResponse");

      // Check if response contains the expected data
      if (fetchHelpIssueResponse?.data) {
        setIssueMessage(fetchHelpIssueResponse.data);
        setSelectedMessage(fetchHelpIssueResponse.data[0]);
        setCurrentPage(fetchHelpIssueResponse.pagination?.page || 1);
        setTotalRecord(fetchHelpIssueResponse.pagination?.totalPages || 0);
      } else {
        console.log("No issues found in the response");
        setIssueMessage([]); // Empty array if no issues are found
      }
      updateSearchState("idle");
    } catch (error) {
      console.log("Error fetching help issue", error);
      setIssueMessage([]); // Reset the state in case of error
      updateSearchState("idle");
    }
  };

  useEffect(() => {
    if (searchVal.length > 0 && selectedTabIndex === 0) {
      updateSearchState("searching");
      handleSearch(searchVal);
    } else {
      getIssueMessage(searchVal, 1);
    }
  }, [searchVal, selectedTabIndex === 0]);

  const handleSearch = useCallback(
    _.debounce((query) => {
      if (query) {
        getIssueMessage(query, 1);
      }
    }, 300),
    []
  );
  const [showDot, setShowDot] = useState<boolean>(true);

  const FilterButton = () => (
    <Image
      src={Icons.filter}
      alt="Filter Button"
      className="w-full h-full object-center"
    />
  );

  const menuPressHandler = (option: string) => {
    if (option === STRINGS.all) {
      setShowDot(true);
    }
    if (option === STRINGS.open) {
      setShowDot(false);
    }
    if (option === STRINGS.close) {
      setShowDot(false);
    }
  };
  console.log(issueMessage, "help issues message", currentPage, totalRecord);
  return (
    <div className="w-full h-[90%]">
      <PageHeader title={STRINGS.help} />
      <div className="flex gap-x-10 w-full h-full mt-2">
        {/* Left Side View */}
        <div className="flex flex-col w-[35%] overflow-scroll scrollbar-none">
          <CustomTab
            tabs={[
              {
                label: "Employee",
                onClickAction: () => setSelectedTabIndex(0),
              },
              {
                label: "Client",
                onClickAction: () => setSelectedTabIndex(1),
              },
            ]}
            TabIndicatorProps={{
              style: {
                height: "3px",
                borderTopRightRadius: "3px",
                borderTopLeftRadius: "3px",
              },
            }}
            sx={styles}
          />
          <div className="bg-white border pt-4 border-borderGrey rounded-b-lg h-full w-full">
            <div className="flex mx-3 mb-6 gap-x-4">
              <SearchField
                searchStyle="w-[316px]"
                onChangeText={(e) => setSearchVal(e.target.value)}
                value={searchVal}
                onPressCross={() => setSearchVal("")}
                isLoading={searchState === "searching"}
              />
              <div className="w-10 h-10 p-2 flex justify-center items-center border rounded border-borderGrey">
                <Badge
                  variant="dot"
                  color="warning"
                  overlap="circular"
                  invisible={showDot}
                >
                  <CustomMenuComponent
                    menuButton={<FilterButton />}
                    isOpen={false}
                    data={[
                      {
                        icon: Icons.allMessage,
                        value: STRINGS.all,
                        onPresItem: () =>
                          menuPressHandler && menuPressHandler(STRINGS.all),
                      },
                      {
                        icon: Icons.openMessage,
                        value: STRINGS.open,
                        onPresItem: () =>
                          menuPressHandler && menuPressHandler(STRINGS.open),
                      },
                      {
                        icon: Icons.closeMessage,
                        value: STRINGS.close,
                        onPresItem: () =>
                          menuPressHandler && menuPressHandler(STRINGS.close),
                      },
                    ]}
                  />
                </Badge>
              </div>
            </div>
            {selectedTabIndex === 0 && (
              <MessageCardsList
                data={issueMessage}
                isLoading={isFetching}
                selectedIssueId={selectedMessage?.id ?? null}
                onPressButton={(issue) => setSelectedMessage(issue)}
              />
            )}
            {selectedTabIndex === 1 && (
              <MessageCardsList
                data={issueMessage}
                isLoading={isFetching}
                selectedIssueId={selectedMessage?.id ?? null}
                onPressButton={(issue) => setSelectedMessage(issue)}
              />
            )}
          </div>
        </div>
        {/* Right Side View */}
        <div className="flex w-[65%] bg-white border border-borderGrey rounded-lg mt-3 p-6 overflow-scroll scrollbar-none">
          {selectedTabIndex === null && (
            <div className="w-full flex justify-center items-center">
              <EmptyScreenView
                //   emptyViewTitle="Please make a selection before moving forward."
                //   emptyViewSubTitle="No message has been chosen."
                illustration={Images.noHelpSupport}
                isDataEmpty={true}
              />
            </div>
          )}
          {selectedTabIndex === 0 && (
            <div className="w-full">{STRINGS.employeeManagement}</div>
          )}
          {selectedTabIndex === 1 && (
            <div className="w-full">{STRINGS.clientManagement}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;

const styles: SxProps<Theme> = {
  "&": {
    paddingX: "12px",
    paddingTop: "4px",
  },
  ".MuiButtonBase-root": {
    fontSize: "16px",
    lineHeight: "20px",
    textTransform: "none",
  },
  ".MuiTabs-flexContainer": {
    gap: "10px",
  },
  ".Mui-selected": {
    fontWeight: "bold",
  },
};
