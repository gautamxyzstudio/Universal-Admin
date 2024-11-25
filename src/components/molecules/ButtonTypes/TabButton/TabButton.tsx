import { ListItemButton } from '@mui/material';
import React from 'react';

type ITabButton = {
  isSelected: boolean;
  onPressButton?: () => void | undefined;
  content?: React.ReactNode;
  title?: string;
};

const TabButton: React.FC<ITabButton> = ({
  isSelected,
  onPressButton,
  content,
  title,
}) => {
  return (
    <ListItemButton
      sx={{
        '&.Mui-selected': {
          border: '1px solid',
          borderColor: '#FF7312',
          minHeight: '60px',
          color: '#FF7312',
        },
        'MuiButtonBase-root': {
          padding: 0,
        },
        border: '1px solid',
        borderColor: '#00000000',
        borderRadius: '8px',
        margin: '12px',
      }}
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
