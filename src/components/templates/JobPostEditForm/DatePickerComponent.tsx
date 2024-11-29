import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { SVGS } from "@/constant/staticSvgs";
import SVGComponent from "@/components/atoms/SvgComponent/SVGComponent";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
type IDatePickerComponentProps = {
  value: Date | string | null;
  onChange: (newValue: dayjs.Dayjs | null) => void;
  label: string | null;
};

const DatePickerComponent: React.FC<IDatePickerComponentProps> = ({
  value,
  label,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        slotProps={{
          textField: { variant: "outlined", fullWidth: true },
        }}
        slots={{ openPickerIcon: CalendarComponent }}
        value={dayjs.utc(value)}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;

export function CalendarComponent() {
  return <SVGComponent svg={SVGS.calendar} />;
}
