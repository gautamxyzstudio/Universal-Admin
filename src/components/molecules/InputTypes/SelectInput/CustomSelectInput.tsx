import React from "react";
import { ISelectInputProps } from "./CustomSelectInput.types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelectInput: React.FC<ISelectInputProps> = ({
  label,
  value,
  onChange,
  menuItem,
}) => {
  return (
    <FormControl>
      <InputLabel
        id="simple-select-label"
        sx={{
          color: "#868686",
          "&.Mui-focused": {
            color: "#868686",
          },
        }}
      >
      {label}
      </InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={value}
        onChange={onChange}
      >
        {menuItem.map((item) => (
          <MenuItem key={item.itemValue} value={item.itemValue as string}>
            {item.itemLabel}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelectInput;
