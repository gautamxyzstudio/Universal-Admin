import { IUserImageRendererTypes } from "@/components/atoms/UserImageRenderer/UserImageRenderer.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IUserNameWithImageProps {
  name: string;
  image: StaticImport;
  imageStyle?: string;
  type?: IUserImageRendererTypes;
  nameStyle?: string;
  joinDate?: string | undefined;
  companyName?: string | undefined;
  companyNameStyle?: string;
  profileNameStyle?: string;
}
