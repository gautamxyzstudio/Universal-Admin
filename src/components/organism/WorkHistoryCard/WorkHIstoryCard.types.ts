import { IIconWithTextProps } from "@/components/molecules/IconWithText/IconWithText.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
  
export  interface IWorkHistoryCardProps {
    companyName: string;
    profileName: string;
    days:string;
    image: StaticImport;
    textLabel: string;
    textStyle: string;
    iconWithTexts: IIconWithTextProps[];
  }