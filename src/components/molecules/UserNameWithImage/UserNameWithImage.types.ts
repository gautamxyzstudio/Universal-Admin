import { IUserImageRendererTypes } from '@/components/atoms/UserImageRenderer/UserImageRenderer.types';

export interface IUserNameWithImageProps {
  name: string;
  image: string;
  imageStyle?: string;
  type?: IUserImageRendererTypes;
  nameStyle?: string;
  joinDate?: string | undefined;
  companyName?: string | undefined;
  companyNameStyle?: string;
  profileNameStyle?: string;
}
