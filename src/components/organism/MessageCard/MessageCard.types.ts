import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IMessageCardProps {
  isClient: boolean;
  companyName: string;
  profileName: string;
  message: string;
  issueId: number | null;
  issuePublish: Date | string | null;
  image: StaticImport | string | null ;
  textLabel: string | null ;
  textStyle?: string | null ;
}
