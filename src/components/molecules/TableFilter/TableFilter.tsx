import React, { useState } from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu as MuiMenu } from '@mui/base/Menu';
import Image from 'next/image';
import { MenuItem } from '@mui/base/MenuItem';
import { IMenuProps } from './TableFilter.types';
import { Icons } from '../../../../public/exporter';

const TableFilter: React.FC<IMenuProps> = ({
  initialSelectedOption,
  data,
  title,
}) => {
  const [selectedItem, setSelectedItem] = useState(initialSelectedOption.value);

  const createHandleMenuClick = (menuItem: string) => {
    setSelectedItem(menuItem);
  };
  return (
    <div className="flex items-center  gap-x-2 ">
      <p className="text-[12px] leading-4">{title}</p>
      <Dropdown>
        <MenuButton className="bg-white items-center flex  text-disable flex-row justify-between text-text-12 min-w-24 border-[1px] rounded-[4px] border-backgroundLight pl-2 pr-1 py-1">
          {selectedItem}
          <Image
            src={Icons.arrow}
            alt="Dropdown Menu"
            className="w-auto h-auto"
          />
        </MenuButton>
        <MuiMenu className="bg-white min-w-24  drop-shadow ">
          {data.map((item) => {
            const isSelected = item.value === selectedItem;
            const bgColor = isSelected ? 'bg-disable' : 'bg-white';
            return (
              <MenuItem
                className={
                  bgColor +
                  ` px-4 cursor-pointer hover:bg-backgroundLight text-sm py-2`
                }
                key={item.id}
                onClick={() => createHandleMenuClick(item.value)}
              >
                {item.value}
              </MenuItem>
            );
          })}
        </MuiMenu>
      </Dropdown>
    </div>
  );
};

export default TableFilter;
