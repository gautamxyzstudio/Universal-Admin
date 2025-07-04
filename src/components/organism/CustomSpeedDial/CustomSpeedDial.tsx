import React from 'react';
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  ManageAccountsOutlined,
  ApartmentOutlined,
  PersonOutline,
  PeopleAltOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { routeNames } from '@/utility/routesName';
import { STRINGS } from '@/constant/en';

interface ICustomSpeedDialProps {
  open: boolean;
  onClickSpeedDial: () => void;
}
const CustomSpeedDial: React.FC<ICustomSpeedDialProps> = ({
  open,
  onClickSpeedDial,
}) => {
  const route = useRouter();
  const actions = [
    {
      icon: <ManageAccountsOutlined />,
      name: 'Administrator',
      onclick: () => route.push(routeNames.SubAdmin),
    },
    {
      icon: <ApartmentOutlined />,
      name: 'Company',
      onclick: () => route.push(routeNames.Company),
    },
    {
      icon: <PersonOutline />,
      name: 'Employee',
      onclick: () => route.push(routeNames.Employees),
    },
    {
      icon: <PeopleAltOutlined />,
      name: 'Client',
      onclick: () => route.push(routeNames.Client),
    },
  ];
  return (
    <div className="relative w-full h-full">
      <Backdrop
        open={open}
        sx={{
          zIndex: '10',
        }}
      />
      <SpeedDial
        ariaLabel="speedDial menu"
        sx={{
          position: 'relative',
          right: '0px',
          top: '10px',
          '.MuiSpeedDial-actions ': {
            paddingTop: '39px',
          },
          '.MuiSvgIcon-root': {
            fill: open ? '#109b4f' : '#fff',
            opacity: 1,
          },
          '.MuiSpeedDialIcon-icon': {
            transform: open ? 'rotate(45deg)' : '',
          },
        }}
        FabProps={{
          sx: {
            width: open ? '40px' : '97px ',
            height: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: open ? '#fff' : '#109b4f',
            gap: ' 4px;',
            borderRadius: '8px',
            boxShadow: 'none',
            color: 'white',
            ':hover': {
              backgroundColor: open ? '#fff' : '#109b4f',
            },
          },
        }}
        direction="down"
        onClick={onClickSpeedDial}
        open={open}
        icon={
          <>
            <SpeedDialIcon /> {!open && STRINGS.create}
          </>
        }
      >
        {actions.map((item, index) => {
          return (
            <SpeedDialAction
              key={index}
              icon={item.icon}
              tooltipOpen
              tooltipTitle={item.name}
              onClick={item.onclick}
              sx={{
                '.MuiSpeedDialAction-staticTooltipLabel': {
                  color: 'white',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: 0,
                  margin: 0,
                },
                '.MuiButtonBase-root': {
                  boxShadow: 'none',
                  backgroundColor: '#109b4f',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  ':hover': {
                    backgroundColor: '#109b4f',
                  },
                },
                '.MuiSvgIcon-root': {
                  fill: '#fff',
                },
              }}
            />
          );
        })}
      </SpeedDial>
    </div>
  );
};

export default CustomSpeedDial;
