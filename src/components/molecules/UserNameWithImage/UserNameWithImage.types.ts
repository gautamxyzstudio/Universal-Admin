import { IUserImageRendererTypes } from '@/components/atoms/UserImageRenderer/UserImageRenderer.types';

export interface IUserNameWithImageProps {
  name: string;
  image: null | string | undefined;
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
}
