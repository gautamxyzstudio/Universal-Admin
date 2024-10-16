import { SxProps, Theme } from '@mui/material';

export interface ICustomButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean | undefined;
  size?: 'small' | 'large' | 'medium';
  fullWidth?: boolean | undefined;
  buttonType: 'primary';
  isLoading?: boolean;
  customStyles?: SxProps<Theme> | undefined;
  variant?: 'contained' | 'outlined';
  icon?: React.ReactNode;
}

export type IButtonType = 'primary';

export const getStylesFromButtonType = (
  buttonType: IButtonType
): SxProps<Theme> | undefined => {
  switch (buttonType) {
    case 'primary':
      return {
        color: 'white',
        fontSize: '24px',
        lineHeight: '28px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        borderRadius: '4px',
        paddingY: '10px',
      };
  }
};
