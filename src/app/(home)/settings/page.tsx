/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import PageHeader from '@/components/organism/PageHeader/PageHeader';
import { STRINGS } from '@/constant/en';
import { Icons } from '../../../../public/exporter';
import Image from 'next/image';
import { List, ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import FaqTab from '@/components/templates/FaqTab/FaqTab';

const settings = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [selectedTab, setSelectedTab] = useState<React.ReactNode>(<FaqTab />);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    itemOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  ) => {
    event.preventDefault();
    setSelectedIndex(index);
    if (itemOnClick) {
      itemOnClick(event); // Call the dynamic onClick function if provided
    }
  };

  const handleFaqTab = () => {
    setSelectedTab(<FaqTab />);
  };
  // const handleMyAccountTab = () => {
  //   setSelectedTab('My Account selected tab');
  // };
  // const handleNotificationsTab = () => {
  //   setSelectedTab('Notifications selected tab');
  // };
  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="w-[28%] h-full pr-4">
        <PageHeader title={STRINGS.settings} />
        <List
          sx={{
            '&': {
              padding: '16px 0 0 0',
            },
            '& .MuiListItemButton-root': {
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              padding: '24px',
            },
            '&.Mui-selected': {
              backgroundColor: '#FFF8F4',
              color: '#109b4f',
            },
          }}
        >
          {/* <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) =>
              handleListItemClick(event, 0, handleMyAccountTab)
            }
          >
            <Image
              src={selectedIndex === 0 ? Icons.user : Icons.people}
              alt={STRINGS.myacc}
              className="w-6 h-6"
            />
            <p
              className={`text-base ${
                selectedIndex === 0 ? "text-primary font-bold" : "text-disable"
              }`}
            >
              {STRINGS.myacc}
            </p>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) =>
              handleListItemClick(event, 1, handleNotificationsTab)
            }
          >
            <Image
              src={selectedIndex == 1 ? Icons.notification : Icons.notify}
              alt={STRINGS.notification}
              className="w-6 h-6"
            />
            <p
              className={`text-base ${
                selectedIndex === 1 ? "text-primary font-bold" : "text-disable"
              }`}
            >
              {STRINGS.notification}
            </p>
          </ListItemButton> */}
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2, handleFaqTab)}
          >
            <Image
              src={selectedIndex == 2 ? Icons.faqs : Icons.faq}
              alt={STRINGS.faq}
              className="w-6 h-6"
            />
            <p
              className={`text-base ${
                selectedIndex === 2 ? 'text-primary font-bold' : 'text-disable'
              }`}
            >
              {STRINGS.faq}
            </p>
          </ListItemButton>
        </List>
      </div>
      <div className="w-[72%] h-full">{selectedTab}</div>
    </div>
  );
};

export default settings;
