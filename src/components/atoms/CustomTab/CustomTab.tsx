"use client";
import { Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { ICustomTabProps, ITabPanelProps } from "./CustomTab.types";

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CustomTab: React.FC<ICustomTabProps> = ({ tabs }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
  return (
    <div className="border-b border-borderGrey rounded-lg mt-3 bg-white h-screen">
      <div className="border-b border-borderGrey">
        <Tabs
          value={currentTabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          TabIndicatorProps={{
            style: {
              height: "3px",
              borderTopRightRadius: "3px",
              borderTopLeftRadius: "3px",
            },
          }}
          sx={{
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
          }}
        >
          {tabs.map((tab, index) => (
            <Tab label={tab.label} key={index} {...a11yProps(index)} />
          ))}
        </Tabs>
      </div>
      {tabs.map((tab, index) => (
        <TabPanel value={currentTabIndex} index={index} key={index}>
          <div className="py-4 px-3">{tab.content}</div>
        </TabPanel>
      ))}
    </div>
  );
};

export default CustomTab;
