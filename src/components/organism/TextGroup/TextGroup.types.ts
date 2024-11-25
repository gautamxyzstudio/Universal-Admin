import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ITextGroupProps {
  title: string;
  subTitle?: string;
  text: string | number | null | undefined
  subText?: string;
  divStyle?: string;
  titleStyle?: string;
  textStyle?: string;
  textgroupStyle?: string;
  icon?: StaticImport;
}
