import { StaticImageData } from "next/image";
import React from "react";

export interface IListItemProps{
    label?: string,
    icon?: StaticImageData,
    status?: string,
    onClick?: () => void; 
    children?: React.ReactNode;
   
}

export interface ICustomListProps{
    items?: IListItemProps[];
    noList? : React.ReactNode;
}