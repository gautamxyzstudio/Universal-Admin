import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Icons } from "../../../../../public/exporter";
import { MouseEventHandler } from "react";

export type IConfirmationDialogProps = {
  type: IDialogTypes;
  onClose:
    | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  title?: string;
  description?: string;
  onPressButton?: MouseEventHandler<HTMLButtonElement> ;
  open: boolean;
};

export type IDialogTypes = "logout" | "success" | "delete";

export const getDialogAttributes = (
  type: IDialogTypes
): {
  icon: StaticImport;
} => {
  switch (type) {
    case "success":
      return {
        icon: Icons.success,
      };
    case "logout":
      return {
        icon: Icons.logoutSecondary,
      };
    case "delete":
      return {
        icon: Icons.deleteIcon,
      };
    default:
      return {
        icon: Icons.success,
      };
  }
};
