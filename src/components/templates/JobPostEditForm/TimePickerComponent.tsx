import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SVGComponent from "@/components/atoms/SvgComponent/SVGComponent";
import { SVGS } from "@/constant/staticSvgs";
import 'dayjs/locale/en'
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

type ITimePickerComponentProps = {
  value: Date | string | null;
  label: string | null;
  onChange: (newValue: dayjs.Dayjs | null) => void;
};

const TimePickerComponent: React.FC<ITimePickerComponentProps> = ({
  value,
  label,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
      <DesktopTimePicker
        ampm = {true}
        label={label}
        defaultValue={dayjs(value)}
        onChange={onChange}
        views={["hours", "minutes"]}
        slots={{ openPickerIcon: ClockIconComponent }}
      />
    </LocalizationProvider>
  );
};

export default TimePickerComponent;

export function ClockIconComponent() {
  return <SVGComponent svg={SVGS.clock} />;
}
