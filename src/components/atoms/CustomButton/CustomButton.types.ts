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
  | 'outline-primary-small'
  | 'outline-gray-red'
  | 'outline-small-blue';

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
        backgroundColor: '#FFF4F4',
        fontWeight: '400',
        textTransform: 'capitalize',
        borderRadius: '4px',
        border: '1px solid',
        padding: '8px',
      };
    case 'outline-small-green':
      return {
        color: '#469C73',
        borderColor: '#469C73',
        backgroundColor: '#F6FFFB',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
        border: '1px solid',
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
        padding: '10px 12px',
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
    case 'outline-primary-small':
      return {
        color: '#FF7312',
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '400',
        textTransform: 'capitalize',
        borderRadius: '8px',
        padding: '10px 12px',
      };
    case 'outline-gray-red':
      return {
        color: '#C11919',
        fontSize: '16px',
        lineHeight: '20px',
        borderColor: '',
        backgroundColor: 'transparent',
        fontWeight: '400',
        textTransform: 'capitalize',
        border: '1px solid #EBEBEB',
        borderRadius: '8px',
        padding: '10px 12px',
      };
    case 'outline-small-blue':
      return {
        color: '#1985C1',
        borderColor: '#1985C1',
        backgroundColor: '#F6FCFF',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
        border: '1px solid',
        borderRadius: '4px',
        padding: '8px',
      };
  }
};
