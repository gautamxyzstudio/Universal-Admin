import { IIconWithTextProps } from '@/components/molecules/IconWithText/IconWithText.types';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IJobPostCardProps {
  companyName?: string;
  postByName?: string;
  profileName: string;
  days?: Date | undefined;
  image: StaticImport | string | null | undefined;
  textLabel?: string | null | undefined;
  textStyle?: string | null | undefined;
  iconWithTexts: IIconWithTextProps[];
}
