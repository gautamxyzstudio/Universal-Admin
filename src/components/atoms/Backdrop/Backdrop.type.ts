export interface IBackdropProps {
  open: boolean;
  onClose?: React.MouseEventHandler<HTMLElement> | undefined;
  children: React.ReactNode;
}
