export interface ICustomButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean | undefined;
  size?: "small" | "large" | "medium";
  fullWidth?: boolean | undefined;
  variant?: "contained" | "outlined";
  icon? : React.ReactNode
}
