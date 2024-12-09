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
import { IJobPostStatus } from "@/constant/enums";

const HelpAndSupport = () => {
  // Tab Selection
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

  const [selectedMessage, setSelectedMessage] = useState<IIssueRaisedByEmployee | null>(null);
  const [selectedMessageByClient, setSelectedMessageByClient] = useState<IIssueRaisedByClient | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalRecord, setTotalRecord] = useState(0);
  const [searchState, updateSearchState] = useState<"idle" | "searching">(
    "idle"
  );

  // Fetch Issues By Employee
  const getIssueMessageByEmp = async (searchVal: string) => {
    try {
      const fetchHelpIssueResponse = await fetchHelpIssueByEmp({
        searchVal,
        // pageNo: page,
      }).unwrap();

      if (fetchHelpIssueResponse?.data) {
        let filteredData = fetchHelpIssueResponse.data;
        // Apply Filter
        if (filterStatus === "Open") {
          filteredData = filteredData.filter(
            (issue) => issue.issueStatus === IJobPostStatus.OPEN
          );
        } else if (filterStatus === "Closed") {
          filteredData = filteredData.filter(
            (issue) => issue.issueStatus === IJobPostStatus.CLOSED
          );
        }

        setIssueMessageByEmp(filteredData);
        setSelectedMessage(filteredData[0] ?? null);
        // setCurrentPage(fetchHelpIssueResponse.pagination?.page || 1);
        // setTotalRecord(fetchHelpIssueResponse.pagination?.totalPages || 0);
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
  const getIssueMessageByClient = async (searchVal: string) => {
    try {
      const issueResponse = await fetchHelpIssueByClient({
        searchVal,
        // pageNo: page,
      }).unwrap();
      if(issueResponse?.data){
        let filteredData = issueResponse.data;
        // Apply Filter
        if (filterStatus === "Open") {
          filteredData = filteredData.filter(
            (issue) => issue.issueStatus === IJobPostStatus.OPEN
          );
        } else if (filterStatus === "Closed") {
          filteredData = filteredData.filter(
            (issue) => issue.issueStatus === IJobPostStatus.CLOSED
          );
        }

        setIssueMessageByClient(filteredData);
        setSelectedMessageByClient(filteredData[0] ?? null);
        // setCurrentPage(fetchHelpIssueResponse.pagination?.page || 1);
        // setTotalRecord(fetchHelpIssueResponse.pagination?.totalPages || 0);
      } else {
        setIssueMessageByEmp([]);
      }
      updateSearchState("idle");
      
    } catch (error) {
      console.log("Error fetching help issue by client", error);
      setIssueMessageByClient([]);
      updateSearchState("idle");
    }
  }
  console.log(issueMessageByEmp, "issue message", issueMessageByEmp);
  // Handle Filter Change
  const menuPressHandler = (status: string) => {
    setFilterStatus(status);
    getIssueMessageByEmp(searchVal); 
    getIssueMessageByClient(searchVal); 
  };

  // Handle Search
  const handleSearch = useCallback(
    _.debounce((query) => {
      getIssueMessageByEmp(query);
      getIssueMessageByClient(query);
    }, 300),
    [filterStatus, searchVal]
  );

  useEffect(() => {
    if (selectedTabIndex === 0) {
      if (searchVal.length > 0) {
        updateSearchState("searching");
        handleSearch(searchVal);
      } else {
        getIssueMessageByEmp(searchVal);
      }
    }
  }, [selectedTabIndex === 0, filterStatus, searchVal]);

  // Filter Button
  const FilterButton = () => (
    <Image
      src={Icons.filter}
      alt="Filter Button"
      className="w-full h-full object-center"
    />
  );

  const FILTER_OPTIONS = [
    { label: STRINGS.all, value: "All" },
    { label: STRINGS.open, value: "Open" },
    { label: STRINGS.closed, value: "Closed" },
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
            invisible={filterStatus === "All"}
          >
            <CustomMenuComponent
              isOpen={false}
              menuButton={<FilterButton />}
              data={FILTER_OPTIONS.map((option) => ({
                icon: Icons[option.value.toLowerCase() + "Message"],
                value: option.label,
                onPresItem: () => menuPressHandler(option.value),
              }))}
            />
          </Badge>
        </div>
      </div>
      <span className="text-accentColor text-sm font-bold">{`Open Ticket (3)`}</span>
    </div>
  );

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
                isClients={false}
                data={issueMessageByEmp}
                isLoading={isFetchingByEmp}
                selectedIssueId={selectedMessage?.id ?? null}
                onPressButton={(issue) => setSelectedMessage(issue)}
              />
            )}
            {selectedTabIndex === 1 && (
              <MessageCardsList
                isClients={true}
                data={issueMessageByEmp}
                isLoading={isFetchingByClient}
                selectedIssueId={selectedMessageByClient?.id ?? null}
                onPressButton={(issue) => setSelectedMessageByClient(issue)}
              />
            )}
          </div>
        </div>
        {/* Right Side View */}
        <div className="flex w-[65%] h-[95%] bg-white border border-borderGrey rounded-lg mt-3 p-6 overflow-scroll scrollbar-none">
          {selectedTabIndex === null && (
            <div className="w-full flex justify-center items-center">
              <EmptyScreenView
                illustration={Images.noHelpSupport}
                isDataEmpty={true}
              />
            </div>
          )}
          {selectedTabIndex === 0 && selectedMessage && (
            <div className="w-full mt-2 h-full">
              <IssueRaisedDetails data={selectedMessage} />
            </div>
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
