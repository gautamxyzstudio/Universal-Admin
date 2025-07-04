import { ListItemButton } from '@mui/material';
import React from 'react';
import { ITabButtonProps } from './TabButton.types';

const TabButton: React.FC<ITabButtonProps> = ({
  isSelected,
  onPressButton,
  content,
  title,
  customButtonStyle,
  ...props
}) => {
  return (
    <ListItemButton
      {...props}
      sx={
        customButtonStyle
          ? customButtonStyle
          : {
              '&.Mui-selected': {
                border: '1px solid',
                borderColor: '#109b4f',
                minHeight: '60px',
                color: '#109b4f',
              },
              '.MuiButtonBase-root': {
                padding: 0,
              },
              border: '1px solid',
              borderColor: '#EBEBEB',
              borderRadius: '8px',
              marginX: '12px',
              marginBottom: '12px',
            }
      }
      selected={isSelected}
      onClick={onPressButton}
    >
      {title ? (
        <div className="flex flex-row gap-x-4">
          <h1 className="text-black text-text-md">{title}</h1>
        </div>
      ) : (
        content
      )}
    </ListItemButton>
  );
};

export default TabButton;
