export interface IAddCompanyListProps{
  show: boolean;
  handleClose:
    | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  onPressCross: () => void;
}
