import { IUserImageRendererTypes } from '@/components/atoms/UserImageRenderer/UserImageRenderer.types';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IUserNameWithImageProps {
  name: string;
  image: StaticImport | undefined | string |null;
  imageStyle?: string;
  type?: IUserImageRendererTypes;
  nameStyle?: string;
  joinDate?: string | undefined;
  companyName?: string | undefined;
  containerStyle?: string | undefined;
  days?: string | Date |null;
  subText?: string | null;
  companyNameStyle?: string;
  divStyle?: string | undefined;
  profileNameStyle?: string;
  postby?: string | undefined;
  postbyStyle?: string | undefined;
  isLoading?: boolean;
}
