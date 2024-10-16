"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Icons } from "../../../../../public/exporter";
import CustomInput from "../../../atoms/CustomInput/CustomInput";
import { IconButton, InputAdornment } from "@mui/material";
import { ISearch, ISearchInputProps } from "./SearchInput.types";


const SearchField:React.FC<ISearchInputProps> = ({searchStyle}) => {
  const [data, setData] = useState<ISearch>({
    searchText: "",
  });
  return (
    <div className={ searchStyle  +" flex items-center justify-center"}>
      <CustomInput
        className="w-full"
        type="search"
        value={data.searchText}
        onChange={(e) => {
          console.log(e.target.value);
          setData({
            searchText: e.target.value,
          });
        }}
        placeholder="Search"
        size="small" 
        sx={{
          "& .MuiInputBase-input": {
            width: "100%",
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton className="z-10" edge="start">
                  <Image
                    src={Icons.search}
                    alt="search"
                    className="w-auto h-auto"
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default SearchField;
