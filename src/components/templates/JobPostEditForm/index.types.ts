import { IJobPostTypes } from "@/api/fetures/Company/Company.types";

export interface IJobPostEditFromProps {
    show: boolean;
    setGlobalModalState: (state: boolean) => void;
    onPostEditHandler?: (post: IJobPostTypes) => void;
    currentPost: IJobPostTypes | null; 
}

export interface IEditorDialogProps {
    open: boolean;
    onClose:
    | ((event: object, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
    data : string;
    onClickBack: () => void;
    onClickUpdate: (data : string) => void;
}