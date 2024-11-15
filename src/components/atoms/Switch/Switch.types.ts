export type ISwitchProps = {
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => void;
  label: string;
  className: string | undefined;
};
