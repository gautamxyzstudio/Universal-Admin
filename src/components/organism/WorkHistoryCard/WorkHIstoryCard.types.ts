import { IIconWithTextProps } from "@/components/molecules/IconWithText/IconWithText.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IWorkHistoryCardProps {
  companyName?: string;
  postbyName? : string;
  profileName: string;
  days: Date;
  image: StaticImport | string | null | undefined;
  textLabel: string;
  textStyle: string;
  iconWithTexts: IIconWithTextProps[];
}
