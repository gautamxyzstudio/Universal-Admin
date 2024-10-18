"use client";
import { List, ListItemButton } from "@mui/material";
import React from "react";
import { ICustomListProps } from "./CustomList.types";
import Image from "next/image";

const CustomList: React.FC<ICustomListProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List
      sx={{
        "&": {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflow: "scroll",
          height: "25vh",
          scrollbarWidth: "none",
        },
        "& .MuiListItemButton-root": {
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          height: "60px",
          maxHeight: "60px",
          backgroundColor: "#FAFAFA",
          color: "#121212",
          fontSize: "16px",
          lineHeight: "20px",
        },
      }}
    >
      {items.map((item, index) => (
        <ListItemButton
          key={index}
          sx={{
            "&.Mui-selected": {
              border: "1px solid",
              borderColor: "#FF7312",
              color: "#FF7312",
            },
          }}
          selected={selectedIndex === index}
          onClick={(event) => handleListItemClick(event, index)}
        >
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
            <span>{item.label}</span>
          </div>
          {item.status && (
            <span
              className={`text-[14px] leading-[18px] ${
                item.status === "Approved" ? "text-green" : "text-yellow"
              }`}
            >
              {item.status}
            </span>
          )}
        </ListItemButton>
      ))}
    </List>
  );
};

export default CustomList;
