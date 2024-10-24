export interface IFormDialogProps {
  title: string;
  open: boolean;
  handleClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  onPressCross: () => void;
  width?: number;
  children?: React.ReactNode | undefined;
}
