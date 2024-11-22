'use client';
import { Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import { ICustomTabProps } from './CustomTab.types';

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const CustomTab: React.FC<ICustomTabProps> = ({ tabs, children, ...props }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <div className="border border-borderGrey rounded-t-lg mt-3 bg-white h-fit">
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
      {children}
    </div>
  );
};

export default CustomTab;
