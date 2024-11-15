export interface ISwitchProps {
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => void;
  label: string | undefined;
  className?: string | undefined;
  switchClassName?: string | undefined;
};
