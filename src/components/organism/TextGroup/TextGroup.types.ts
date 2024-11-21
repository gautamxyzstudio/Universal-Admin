import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface ITextGroupProps {
  title: string;
  subTitle?: string;
  text: string;
  subText?: string;
  divStyle?: string;
  titleStyle?: string;
  textStyle?: string;
  textgroupStyle?: string;
  isLoading?: boolean;
  icon?: StaticImport;
}
