import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ITextGroupProps {
    title: string;
   subTitle: string;
    divStyle?: string;
    titleStyle?: string;
    subTitleStyle?: string;
    textgroupStyle?: string;
    icon?: StaticImport;
}