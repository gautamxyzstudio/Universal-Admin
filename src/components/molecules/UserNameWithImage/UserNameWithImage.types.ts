import { IUserImageRendererTypes } from '@/components/atoms/UserImageRenderer/UserImageRenderer.types';
import { StaticImageData } from 'next/image';

export interface IUserNameWithImageProps {
  name: string;
  image: StaticImageData | undefined | string;
  imageStyle?: string;
  type?: IUserImageRendererTypes;
  nameStyle?: string;
  joinDate?: string | undefined;
  companyName?: string | undefined;
  containerStyle?: string | undefined;
  days?: string | Date;
  subText?: string | null;
  companyNameStyle?: string;
  divStyle?: string | undefined;
  profileNameStyle?: string;
  postby?: string | undefined;
  postbyStyle?: string | undefined;
  isLoading?: boolean;
}
