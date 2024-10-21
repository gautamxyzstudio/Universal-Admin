import { ICustomInputProps } from '@/components/atoms/CustomInput/CustomInput.types';
import { SvgIconPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export interface IPasswordInputProps extends ICustomInputProps {
  showPassword: boolean;
  handleClickShowPassword: () => void;
  eyeColor?: OverridableStringUnion<
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    SvgIconPropsColorOverrides
  >;
}
