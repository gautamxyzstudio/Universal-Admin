import { ICustomErrorResponse } from '@/api/types';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IEmptyScreenViewProps {
  emptyViewTitle: string;
  emptyViewSubTitle: string;
  illustration: StaticImport;
  retryHandler?: () => void;
  error: ICustomErrorResponse | undefined;
  isDataEmpty: boolean;
}