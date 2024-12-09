import React, { useState } from "react";
import { IMenuItemProps } from "./CustomMenuComponent.types";
import { Menu, Fade, MenuItem, IconButton } from "@mui/material";
import Image from "next/image";

const CustomMenuComponent: React.FC<IMenuItemProps> = ({
  data,
  menuButton,
  textSize = "text-text-12",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onPressKebab = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="openMenu"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ padding: 0 }}
        onClick={onPressKebab}
      >
        {menuButton}
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "openMenu",
        }}
        sx={{
          ".MuiList-root": {
            padding: "0px",
            width: "180px",
          },
          ".MuiMenuItem-root": {
            padding: "12px 125px 12px 12px",
            gap: "12px",
          },
        }}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {data.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                item.onPresItem(item.value);
                handleClose();
              }}
            >
              <Image className="w-5 h-5" src={item.icon} alt={item.value} />
              <span className={textSize}>{item.value}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CustomMenuComponent;
