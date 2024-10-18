import { StaticImageData } from "next/image";

interface IListItemProps{
    label: string,
    icon?: StaticImageData,
    status?: string,
    onClickAction? : () =>  void; 
}

export interface ICustomListProps{
    items: IListItemProps[],
}