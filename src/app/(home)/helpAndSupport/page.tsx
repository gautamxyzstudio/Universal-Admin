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
const HelpAndSupport = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  // By Employees
  const [fetchHelpIssueByEmp, { isFetching: isFetchingByEmp }] = useLazyGetHelpIssuesByEmpQuery();
  const [issueMessageByEmp, setIssueMessageByEmp] = useState<IIssueRaisedByEmployee[]>([]);
  // By Clients
  const [fetchHelpIssueByClient, { isFetching: isFetchingByClient }] = useLazyGetHelpIssuesByClientQuery();
  const [issueMessageByClient, setIssueMessageByClient] = useState<IIssueRaisedByClient[]>([]);
  //Selected Message by Id
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  // Filter Status
  const [filterStatus, setFilterStatus] = useState<IIssueRaisedStatusEnum>();
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);
  // Searching
  const [searchVal, setSearchVal] = useState("");
  const [searchState, updateSearchState] = useState<"idle" | "searching">("idle");
  // Fetch Issues By Employee
  const getIssueMessageByEmp = async (
    searchVal: string,
    isFirstPage?: boolean
  ) => {
    const pageNo = isFirstPage ? 1 : currentPage + 1;
    const changeStatus = filterStatus;
    try {
      const employeeResponse = await fetchHelpIssueByEmp({
        searchVal,
        page: pageNo,
        status: changeStatus,
      }).unwrap();

      if (employeeResponse?.data) {
        if (pageNo === 1) {
          setIssueMessageByEmp(employeeResponse.data);
        } else {
          setIssueMessageByEmp((prev) => {
            const prevIssues = [...prev];
            prevIssues.push(...employeeResponse.data);
            const uniqueArray = Array.from(new Set(prevIssues));
            return uniqueArray;
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
  // Fetch Issues By Client
  const getIssueMessageByClient = async (
    searchVal: string,
    isFirstPage?: boolean
  ) => {
    const pageNo = isFirstPage ? 1 : currentPage + 1;
    const changeStatus = filterStatus;
    try {
      const issueResponse = await fetchHelpIssueByClient({
        searchVal,
        page: pageNo,
        status: changeStatus,
      }).unwrap();
      if (issueResponse?.data) {
        if (pageNo === 1) {
          setIssueMessageByClient(issueResponse?.data);
        } else {
          setIssueMessageByClient((prev) => {
            const prevIssues = [...prev];
            prevIssues.push(...issueResponse.data);
            const uniqueArray = Array.from(new Set(prevIssues));
            return uniqueArray;
          });
        }
        setCurrentPage(issueResponse.pagination?.page);
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
  const handleFilterChange = (status?: IIssueRaisedStatusEnum) => {
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
        setSelectedMessageId(null);
      }
    }
  }, [selectedTabIndex === 0, filterStatus,  searchVal]);
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
        setSelectedMessageId(null);
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
    { icon: Icons.allMessage, value: STRINGS.all, status: undefined },
    { icon: Icons.openMessage, value: "Open", status: IIssueRaisedStatusEnum.OPEN },
    { icon: Icons.closedMessage, value: "Closed", status: IIssueRaisedStatusEnum.CLOSED },
    { icon: Icons.notAnIssueMessage, value: "Not an Issue", status: IIssueRaisedStatusEnum.NO_ISSUE },
  ];
  // List Header Options
  const ListHeader = () => (
    <div className="flex flex-col gap-y-4 mx-3 h-fit">
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
            invisible={filterStatus === undefined}
          >
            <CustomMenuComponent
              isOpen={false}
              menuButton={<FilterButtonIcon />}
              data={FILTER_OPTIONS.map((option) => ({
                ...option,
                onPresItem: () => handleFilterChange(option.status),
              }))}
            />
          </Badge>
        </div>
      </div>
      {filterStatus && filterStatus !== undefined && (
        <span className="text-accentColor text-sm font-bold">{`${getIssueRaisedStatus(
          filterStatus
        )} Ticket (${
          (selectedTabIndex === 0 && issueMessageByEmp.length) ||
          (selectedTabIndex === 1 && issueMessageByClient.length)
        })`}</span>
      )}
    </div>
  );
  // Mark as Read
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
  // Change Issue Status
  const changedIssueStatus = (
    messageId: number,
    changedStatus: IIssueRaisedStatusEnum
  ) => {
    if (selectedTabIndex === 0) {
      const updatedData = issueMessageByEmp.map((message) => {
        if (message.id === messageId) {
          return { ...message, issueStatus: changedStatus }; // Mark it as read
        }
        return message;
      });
      setIssueMessageByEmp(updatedData);
    }
    if (selectedTabIndex === 1) {
      const updatedData = issueMessageByClient.map((message) => {
        if (message.id === messageId) {
          return { ...message, issueStatus: changedStatus }; // Mark it as read
        }
        return message;
      });
      setIssueMessageByClient(updatedData);
    }
  };
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
          <div className="bg-white border py-4 border-borderGrey rounded-b-lg w-full flex flex-col h-full gap-y-4">
            <ListHeader />
            {selectedTabIndex === 0 && (
              <MessageCardsList
                changedIssueStatus={changedIssueStatus}
                onReachEnd={loadMore}
                isLastPage={isLastPage}
                data={issueMessageByEmp}
                isLoading={isFetchingByEmp}
                selectedIssueId={selectedMessageId ?? null}
                onPressButton={(issueId) => setSelectedMessageId(issueId)}
                markAsRead={markAsRead}
              />
            )}
            {selectedTabIndex === 1 && (
              <MessageCardsList
                changedIssueStatus={changedIssueStatus}
                onReachEnd={loadMore}
                isLastPage={isLastPage}
                data={issueMessageByClient}
                isLoading={isFetchingByClient}
                selectedIssueId={selectedMessageId ?? 0}
                onPressButton={(issue) => setSelectedMessageId(issue)}
                markAsRead={markAsRead}
              />
            )}
          </div>
        </div>
        {/* Right Side View */}
        <div className="flex w-[65%] h-[95%] bg-white border border-borderGrey rounded-lg mt-3 p-6 overflow-scroll scrollbar-none justify-center items-center">
          {(selectedTabIndex === 0 || selectedTabIndex === 1) &&
          selectedMessageId ? (
            <div className="w-full mt-2 h-full">
              <IssueRaisedDetails
                messageId={selectedMessageId}
                markAsRead={markAsRead}
                changedStatus={changedIssueStatus}
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

