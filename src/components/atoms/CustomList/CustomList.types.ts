import { IDocumentStatus } from '@/constant/enums';
import { StaticImageData } from 'next/image';
import React from 'react';

export interface IListItemProps {
  label?: string;
  icon?: StaticImageData;
  status?: IDocumentStatus;
  onClick?: () => void;
  docId?: number | null;
  children?: React.ReactNode;
}

export interface ICustomListProps {
  items?: IListItemProps[];
  noList?: React.ReactNode;
}
