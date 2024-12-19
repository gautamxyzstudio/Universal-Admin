import { IUserImageRendererTypes } from '@/components/atoms/UserImageRenderer/UserImageRenderer.types';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IUserNameWithImageProps {
  name: string;
  image: StaticImport | null | string ;
  imageStyle?: string | null;
  type?: IUserImageRendererTypes;
  nameStyle?: string| null;
  joinDate?: string | undefined| null;
  companyName?: string | undefined| null;
  containerStyle?: string | undefined| null;
  days?: string | Date |null;
  subText?: string | null;
  companyNameStyle?: string| null;
  divStyle?: string | undefined| null;
  profileNameStyle?: string| null;
  postby?: string | undefined| null;
  postbyStyle?: string | undefined| null;
  isLoading?: boolean;
  issueId? : number | null | undefined;
  issuePublish? :Date| string | null | undefined;
}
