import { SxProps, Theme } from '@mui/material';

export interface ICustomButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  size?: 'small' | 'large' | 'medium';
  fullWidth?: boolean | undefined;
  buttonType: IButtonType;
  isLoading?: boolean;
  customStyles?: SxProps<Theme> | undefined;
  variant?: 'contained' | 'outlined';
  icon?: React.ReactNode;
}

export type IButtonType =
  | 'primary'
  | 'outline-small-red'
  | 'outline-small-green'
  | 'primary-small';

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
    case 'outline-small-red':
      return {
        color: '#C11919',
        fontSize: '14px',
        lineHeight: '18px',
        borderColor: '#C11919',
        fontWeight: '400',
        textTransform: 'capitalize',
        borderRadius: '4px',
        padding: '8px',
      };
    case 'outline-small-green':
      return {
        color: '#469C73',
        borderColor: '#469C73',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
        borderRadius: '4px',
        padding: '8px',
      };
    case 'primary-small':
      return {
        color: 'white',
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '400',
        textTransform: 'capitalize',
        borderRadius: '8px',
        paddingY: '10px',
      };
  }
};
