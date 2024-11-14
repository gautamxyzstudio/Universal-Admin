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
      className="overflow-scroll scrollbar-none"
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

const CustomTab: React.FC<ICustomTabProps> = ({
  tabs,
  ...props
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
    console.log(tabIndex);
  };

  return (
    <div className="border border-borderGrey rounded-lg mt-3 bg-white h-fit">
      <div className="border-b border-borderGrey h-fit">
        <Tabs
          {...props}
          value={currentTabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
        >
          {tabs.map((tab, index) => (
            <Tab
              onClick={tab.onClickAction}
              label={tab.label}
              key={index}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </div>
      {tabs.map((tab, index) => (
        <TabPanel value={currentTabIndex} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};

export default CustomTab;
