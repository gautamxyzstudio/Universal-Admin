import { ButtonProps, SxProps, Theme } from '@mui/material';

export interface ICustomButtonProps extends ButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  size?: 'small' | 'large' | 'medium';
  fullWidth?: boolean | undefined;
  buttonType: IButtonType;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  customStyles?: SxProps<Theme> | undefined;
  variant?: 'contained' | 'outlined';
  icon?: React.ReactNode;
}

export type IButtonType =
  | 'primary'
  | 'outline-small-red'
  | 'outline-small-green'
  | 'primary-small'
  | 'outline-small-disabled'
  | 'outline-primary';

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
    case 'outline-small-disabled':
      return {
        color: '#868686',
        borderColor: '#F2F2F2',
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: '400',
        borderRadius: '4px',
        padding: '8px',
      };
    case 'outline-primary':
      return {
        color: '#FF7312',
        borderColor: '#FF7312',
        padding: '20px 12px',
        fontSize: '16px',
        textTransform: 'none',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius: '8px',
      };
  }
};
