export interface ISearchInputProps {
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  searchStyle?: string;
  isLoading: boolean;
  onPressCross: () => void;
}
