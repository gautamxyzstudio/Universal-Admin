import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface ITextGroupProps {
  title: string;
  subTitle?: string;
  text: string;
  subText?: string;

  type?: ITextGroupTypes;
  titleStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
  icon?: StaticImport;
}

export enum ITextGroupTypes {
  default = 0,
  DateAndTime = 1,
  textType = 2,
  textTypeBank = 3,
  detailPage = 4,
}

export const getTextGroupStyles = (
  type: ITextGroupTypes
): {
  divStyle: string;
  textgroupStyle: string;
} => {
  switch (type) {
    case ITextGroupTypes.default:
      return {
        divStyle:
          'bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]',
        textgroupStyle: 'flex flex-col gap-y-[2px] text-[14px] leading-[18px]',
      };
    case ITextGroupTypes.DateAndTime:
      return {
        divStyle:
          'bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-fit',
        textgroupStyle: 'flex flex-col gap-y-[2px] text-[14px] leading-[18px]',
      };
    case ITextGroupTypes.textType:
      return {
        divStyle: '',
        textgroupStyle: 'flex justify-between w-full',
      };
    case ITextGroupTypes.textTypeBank:
      return {
        divStyle: '',
        textgroupStyle: 'flex flex-col gap-y-',
      };
    case ITextGroupTypes.detailPage:
      return {
        divStyle: '',
        textgroupStyle: 'flex flex-col gap-y-1',
      };
    default:
      return {
        divStyle:
          'bg-extraWhite border border-backgroundLight rounded py-[10px] px-2 w-[136px]',
        textgroupStyle: 'flex flex-col gap-y-[2px] text-[14px] leading-[18px]',
      };
  }
};
