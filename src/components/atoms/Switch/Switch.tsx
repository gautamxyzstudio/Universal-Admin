import React from "react";
import { Switch as MuiSwitch } from "@mui/material";
import { ISwitchProps } from "./Switch.types";

const Switch: React.FC<ISwitchProps> = ({
  checked,
  onChange,
  label,
  className,
}) => {
  return (
    <div className="flex flex-row items-center w-full">
      <MuiSwitch
        focusVisibleClassName="."
        sx={{
          ".MuiSwitch-thumb": {
            color: "white",
          },
          ".MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
            backgroundColor: "#469C73",
            opacity: 1,
          },
          ".MuiSwitch-track": {
            backgroundColor: "red",
            opacity: 1,
          },
        }}
        checked={checked}
        onChange={onChange}
        name="switch"
      />
      {label && <p className={className}>{label}</p>}
    </div>
  );
};

export default Switch;

// const IOSSwitch = styled((props: SwitchProps) => (
//     <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
//   ))(({ theme }) => ({
//     width: 42,
//     height: 26,
//     padding: 0,
//     '& .MuiSwitch-switchBase': {
//       padding: 0,
//       margin: 2,
//       transitionDuration: '300ms',
//       '&.Mui-checked': {
//         transform: 'translateX(16px)',
//         color: '#fff',
//         '& + .MuiSwitch-track': {
//           backgroundColor: '#65C466',
//           opacity: 1,
//           border: 0,
//           ...theme.applyStyles('dark', {
//             backgroundColor: '#2ECA45',
//           }),
//         },
//         '&.Mui-disabled + .MuiSwitch-track': {
//           opacity: 0.5,
//         },
//       },
//       '&.Mui-focusVisible .MuiSwitch-thumb': {
//         color: '#33cf4d',
//         border: '6px solid #fff',
//       },
//       '&.Mui-disabled .MuiSwitch-thumb': {
//         color: theme.palette.grey[100],
//         ...theme.applyStyles('dark', {
//           color: theme.palette.grey[600],
//         }),
//       },
//       '&.Mui-disabled + .MuiSwitch-track': {
//         opacity: 0.7,
//         ...theme.applyStyles('dark', {
//           opacity: 0.3,
//         }),
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       boxSizing: 'border-box',
//       width: 22,
//       height: 22,
//     },
//     '& .MuiSwitch-track': {
//       borderRadius: 26 / 2,
//       backgroundColor: '#E9E9EA',
//       opacity: 1,
//       transition: theme.transitions.create(['background-color'], {
//         duration: 500,
//       }),
//       ...theme.applyStyles('dark', {
//         backgroundColor: '#39393D',
//       }),
//     },
//   }));
