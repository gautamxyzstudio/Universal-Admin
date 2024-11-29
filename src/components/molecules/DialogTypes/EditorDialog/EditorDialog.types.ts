export interface IEditorDialogProps {
    open: boolean;
    onClose:
      | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
      | undefined;
    data: string;
    fieldName: string;
    onClickBack: () => void;
    onClickUpdate: (data: string, fieldName: string) => void;
  }
  