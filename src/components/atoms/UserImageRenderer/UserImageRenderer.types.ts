import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type IUserImageRendererProps = {
  image: StaticImport | string | null | undefined;
  name: string;
  type?: IUserImageRendererTypes;
  imageStyle?: string;
  size?: number;
};

export type IUserImageRendererTypes = "white" | "green" | "red" | undefined;

export const getStylesAttributes = (type: IUserImageRendererTypes) => {
  switch (type) {
    case "white":
      return {
        backgroundColor: "bg-white",
        textColor: "text-textBlack",
      };
    case "green":
      return {
        backgroundColor: "bg-lightGreen",
        textColor: "text-green",
      };
    case "red":
      return {
        backgroundColor: "bg-lightRed",
        textColor: "text-red",
      };

    default:
      return {
        backgroundColor: "bg-white",
        textColor: "text-textBlack",
      };
  }
};
