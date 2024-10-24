import { StaticImageData } from "next/image";

interface IListItemProps{
    label?: string,
    icon?: StaticImageData,
    status?: string,
    onClick?: () => void; 
    children?: React.ReactNode;
}

export interface ICustomListProps{
    items: IListItemProps[],
}