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
import {
  useLazyGetHelpIssuesByClientQuery,
  useLazyGetHelpIssuesByEmpQuery,
} from "@/api/fetures/HelpIssue/HelpIssueApi";
import {
  IIssueRaisedByClient,
  IIssueRaisedByEmployee,
} from "@/api/fetures/HelpIssue/HelpIssueApi.types";
import _ from "lodash";
import MessageCardsList from "./LeftTabViews/MessageCardsList";
import IssueRaisedDetails from "./RightTabViews/IssueRaisedDetails";
import { IIssueRaisedStatusEnum } from "@/constant/enums";
import { getIssueRaisedStatus } from "@/constant/constant";
import { log } from "console";

// import { getUserDetailsFromCookies } from "@/utility/cookies";

const HelpAndSupport = () => {
  // Tab Selection
  // console.log(getUserDetailsFromCookies(), "Tab Selection")
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // By Employees
  const [fetchHelpIssueByEmp, { isFetching: isFetchingByEmp }] =
    useLazyGetHelpIssuesByEmpQuery();
  const [issueMessageByEmp, setIssueMessageByEmp] = useState<
    IIssueRaisedByEmployee[]
  >([]);

  // By Clients
  const [fetchHelpIssueByClient, { isFetching: isFetchingByClient }] =
    useLazyGetHelpIssuesByClientQuery();
  const [issueMessageByClient, setIssueMessageByClient] = useState<
    IIssueRaisedByClient[]
  >([]);

  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);

  const [searchState, updateSearchState] = useState<"idle" | "searching">(
    "idle"
  );

  // Fetch Issues By Employee
  const getIssueMessageByEmp = async (
    searchVal: string,
    isFirstPage?: boolean
  ) => {
    const pageNo = isFirstPage ? 1 : currentPage + 1;
    try {
      const employeeResponse = await fetchHelpIssueByEmp({
        searchVal,
        page: pageNo,
      }).unwrap();

      if (employeeResponse?.data) {
        const filteredData = employeeResponse.data;
        if (pageNo === 1) {
          setIssueMessageByEmp(filteredData);
        } else {
          setIssueMessageByEmp((prev) => {
            const prevIssues = [...prev];
            prevIssues.push(...employeeResponse.data);
            const uniqueArray = [...new Set(prevIssues)];
            return uniqueArray ;
          });
        }
        setCurrentPage(employeeResponse.pagination?.page);
        setIsLastPage(
          employeeResponse?.data.length === 0 ||
            pageNo === employeeResponse.pagination?.totalPages
        );
      } else {
        setIssueMessageByEmp([]);
      }
      updateSearchState("idle");
    } catch (error) {
      console.log("Error fetching help issue by employee", error);
      setIssueMessageByEmp([]);
      updateSearchState("idle");
    }
  };


  console.log(issueMessageByEmp,'FILTERED DATA')


  // console.log(issueMessageByEmp,'issues ')

  // Fetch Issues By Client
  const getIssueMessageByClient = async (
    searchVal: string,
    isFirstPage?: boolean
  ) => {
    const pageNo = isFirstPage ? 1 : currentPage + 1;
    try {
      const issueResponse = await fetchHelpIssueByClient({
        searchVal,
        page: pageNo,
      }).unwrap();
      if (issueResponse?.data) {
        const filteredData = issueResponse.data;
        if (pageNo === 1) {
          setIssueMessageByClient(issueResponse?.data);
        } else {
          setIssueMessageByClient((prev) => {
            const prevIssues = [...prev];
            prevIssues.push(...issueResponse.data);
            const uniqueArray = [...new Set(prevIssues)];
            return uniqueArray ;
          });
        }
        setCurrentPage(issueResponse.pagination?.page);
        console.log(issueResponse.pagination?.totalPages, "Total pages: ")
        setIsLastPage(
          issueResponse.data?.length === 0 ||
          pageNo === issueResponse.pagination?.totalPages
        );
      } else {
        setIssueMessageByEmp([]);
      }
      updateSearchState("idle");
    } catch (error) {
      console.log("Error fetching help issue by client", error);
      setIssueMessageByClient([]);
      updateSearchState("idle");
    }
  };

  // Handle Filter Change
  const menuPressHandler = (status: string) => {
    setFilterStatus(status);
    getIssueMessageByEmp(searchVal, true);
    getIssueMessageByClient(searchVal, true);
  };

  // Handle Search
  const handleSearch = useCallback(
    _.debounce((query) => {
      if (selectedTabIndex === 0) {
        getIssueMessageByEmp(query, true);
      }
      if (selectedTabIndex === 1) {
        getIssueMessageByClient(query, true);
      }
    }, 300),
    []
  );

  // Employee Tab Index
  useEffect(() => {
    if (selectedTabIndex === 0) {
      if (searchVal.length > 0) {
        updateSearchState("searching");
        handleSearch(searchVal);
        setIsLastPage(true);
      } else {
        getIssueMessageByEmp(searchVal, true);
        setIsLastPage(true);
      }
    }
  }, [selectedTabIndex === 0, filterStatus, searchVal]);

  // Client Tab Index
  useEffect(() => {
    if (selectedTabIndex === 1) {
      if (searchVal.length > 0) {
        updateSearchState("searching");
        handleSearch(searchVal);
        setIsLastPage(true);
      } else {
        getIssueMessageByClient(searchVal, true);
        setIsLastPage(true);
      }
    }
  }, [selectedTabIndex === 1, filterStatus, searchVal]);

  // Load More Button
  const loadMore = () => {
    if (!isLastPage && selectedTabIndex === 0) {
      getIssueMessageByEmp(searchVal);
    }
    if (!isLastPage && selectedTabIndex === 1) {
      getIssueMessageByClient(searchVal);
    }
  };

  // Filter Button
  const FilterButtonIcon = () => (
    <Image
      src={Icons.filter}
      alt="Filter Button"
      className="w-full h-full object-center"
    />
  );

  const FILTER_OPTIONS = [
    {
      icon: Icons.allMessage,
      value: STRINGS.all,
      onPresItem: (value: string) => menuPressHandler(value),
    },
    {
      icon: Icons.openMessage,
      value: getIssueRaisedStatus(IIssueRaisedStatusEnum.OPEN),
      onPresItem: (value: string) => menuPressHandler(value),
    },
    {
      icon: Icons.closedMessage,
      value: getIssueRaisedStatus(IIssueRaisedStatusEnum.CLOSED),
      onPresItem: (value: string) => menuPressHandler(value),
    },
    {
      icon: Icons.notAnIssueMessage,
      value: getIssueRaisedStatus(IIssueRaisedStatusEnum.NO_ISSUE),
      onPresItem: (value: string) => menuPressHandler(value),
    },
  ];

  // List Header Options
  const ListHeader = () => (
    <div className="flex flex-col gap-y-4 mx-3 mb-4">
      <div className="flex gap-x-4">
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
            invisible={filterStatus === STRINGS.all}
          >
            <CustomMenuComponent
              isOpen={false}
              menuButton={<FilterButtonIcon />}
              data={FILTER_OPTIONS}
            />
          </Badge>
        </div>
      </div>
      {filterStatus && filterStatus !== STRINGS.all && (
        <span className="text-accentColor text-sm font-bold">{`${filterStatus} Ticket (${
          (selectedTabIndex === 0 && issueMessageByEmp.length) ||
          (selectedTabIndex === 1 && issueMessageByClient.length)
        })`}</span>
      )}
    </div>
  );
  const markAsRead = (messageId: number) => {
    if (selectedTabIndex === 0) {
      const updatedData = issueMessageByEmp.map((message) => {
        if (message.id === messageId) {
          return { ...message, isRead: true }; // Mark it as read
        }
        return message;
      });
      setIssueMessageByEmp(updatedData);
    }
    if (selectedTabIndex === 1) {
      const updatedData = issueMessageByClient.map((message) => {
        if (message.id === messageId) {
          return { ...message, isRead: true }; // Mark it as read
        }
        return message;
      });
      setIssueMessageByClient(updatedData);
    }
  };

  console.log(filterStatus, " issues filtered status: ");
  return (
    <div className="w-full h-[90vh] overflow-hidden">
      <PageHeader title={STRINGS.help} />
      <div className="flex gap-x-10 w-full h-[91%]">
        {/* Left Side View */}
        <div className="flex flex-col w-[35%] h-[97%]">
          <CustomTab
            tabs={[
              {
                label: "Employee",
                onClickAction: () => setSelectedTabIndex(0),
              },
              { label: "Client", onClickAction: () => setSelectedTabIndex(1) },
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
          <div className="bg-white border py-4 border-borderGrey rounded-b-lg h-[91%] w-full">
            <ListHeader />
            {selectedTabIndex === 0 && (
              <MessageCardsList
                onReachEnd={loadMore}
                isLastPage={isLastPage}
                data={issueMessageByEmp}
                isLoading={isFetchingByEmp}
                selectedIssueId={selectedMessage ?? null}
                onPressButton={(issueId) => setSelectedMessage(issueId)}
                markAsRead={markAsRead}
              />
            )}
            {selectedTabIndex === 1 && (
              <MessageCardsList
                onReachEnd={loadMore}
                isLastPage={isLastPage}
                data={issueMessageByClient}
                isLoading={isFetchingByClient}
                selectedIssueId={selectedMessage ?? 0}
                onPressButton={(issue) => setSelectedMessage(issue)}
                markAsRead={markAsRead}
              />
            )}
          </div>
        </div>
        {/* Right Side View */}
        <div className="flex w-[65%] h-[95%] bg-white border border-borderGrey rounded-lg mt-3 p-6 overflow-scroll scrollbar-none">
          {(selectedTabIndex === 0 || selectedTabIndex === 1) &&
          selectedMessage ? (
            <div className="w-full mt-2 h-full">
              <IssueRaisedDetails
                messageId={selectedMessage}
                markAsRead={markAsRead}
              />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <EmptyScreenView
                illustration={Images.noHelpSupport}
                isDataEmpty={true}
              />
            </div>
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
