import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IIconWithTextProps {
    text: string;
    subText?: string;
    icon: StaticImport;
  }