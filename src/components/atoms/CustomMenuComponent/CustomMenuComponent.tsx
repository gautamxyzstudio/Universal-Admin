import React, { useState } from 'react';
import { IMenuItemProps } from './CustomMenuComponent.types';
import { Menu, Fade, MenuItem, IconButton } from '@mui/material';
import Image from 'next/image';
import { MoreVertOutlined } from '@mui/icons-material';

const CustomMenuComponent: React.FC<IMenuItemProps> = ({
  onPresItem,
  onClose,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onPressKebab = () => {
    setIsOpen(true);
  };

  // const onPressClose = () => {
  //   setIsOpen(false);
  //   onClose();
  // }

  return (
    <>
      <IconButton
        id="openMenu"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ padding: 0 }}
        onClick={onPressKebab}
      >
        <MoreVertOutlined />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'openMenu',
        }}
        sx={{
          '.MuiList-root': {
            padding: '0px',
          },
          '.MuiMenuItem-root': {
            padding: '12px 6px 12px 12px',
            gap: '12px',
            fontSize: '12px',
            lineHeight: '16px',
          },
        }}
        onClose={onClose}
        TransitionComponent={Fade}
      >
        {data.map((item, index) => {
          return (
            <MenuItem key={index} onClick={() => onPresItem(item.value)}>
              <Image width={16} height={16} src={item.icon} alt={''} />
              <span>{item.value}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CustomMenuComponent;
