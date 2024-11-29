import { IIconWithTextProps } from "@/components/molecules/IconWithText/IconWithText.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IJobPostCardProps {
  companyName?: string;
  postByName? : string;
  profileName: string;
  days: Date | string;
  image: StaticImport | string | null | undefined;
  textLabel: string;
  textStyle: string;
  iconWithTexts: IIconWithTextProps[];
}
