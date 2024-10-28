export type IPageHeaderProps = {
  title: string;
  withPrimaryButton?: boolean;
  withSecondaryButton?: boolean;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onPressSecondaryButton?:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined;
  onPressButton?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
