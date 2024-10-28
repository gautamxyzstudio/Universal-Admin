export type IPageHeaderProps = {
  title: string;
  withPrimaryButton?: boolean;
  withSecondaryButton?: boolean;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onPressButton?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
