type IPageHeaderProps = {
  title: string;
  withPrimaryButton?: boolean;
  withSecondaryButton?: boolean;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onPressPrimaryButton?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
