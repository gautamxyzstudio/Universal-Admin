'use client';
import { List, ListItemButton } from '@mui/material';
import React from 'react';
import { ICustomListProps } from './CustomList.types';
import Image from 'next/image';
import {
  getDocumentStatusColor,
  getDocumentStatusTextByStatus,
} from '@/utility/utils';

const CustomList: React.FC<ICustomListProps> = ({ items, noList }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    itemOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  ) => {
    event.preventDefault();
    setSelectedIndex(index);
    if (itemOnClick) {
      itemOnClick(event);
    }
  };

  return (
    <List
      sx={{
        '&': {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px 12px',
        },
        '& .MuiListItemButton-root': {
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          height: 'fit-content',
          maxHeight: 'fit-content',
          backgroundColor: '#FAFAFA',
          color: '#121212',
          fontSize: '16px',
          lineHeight: '20px',
        },
      }}
    >
      {items
        ? items.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                '&.Mui-selected': {
                  border: '1px solid',
                  borderColor: '#FF7312',
                  color: '#FF7312',
                },
              }}
              selected={selectedIndex === index}
              onClick={(event) =>
                handleListItemClick(event, index, item.onClick)
              }
            >
              {(item.icon && item.label) ||
              (item.status && item.label && item.label) ||
              item.label ? (
                <>
                  <div className="flex items-center gap-x-2">
                    {item.icon && (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center">
                        <Image
                          src={item.icon}
                          alt="Document image"
                          className="w-auto h-auto"
                        />
                      </div>
                    )}
                    {item.label && <span>{item.label}</span>}
                  </div>
                  {item.status && (
                    <span
                      style={{ color: getDocumentStatusColor(item.status) }}
                      className={`text-[14px] leading-[18px]`}
                    >
                      {getDocumentStatusTextByStatus(item.status)}
                    </span>
                  )}
                </>
              ) : (
                item.children && item.children
              )}
            </ListItemButton>
          ))
        : noList}
    </List>
  );
};

export default CustomList;
