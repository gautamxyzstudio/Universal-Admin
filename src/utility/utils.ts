/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ICustomErrorResponse } from '@/api/types';
import { IDocumentStatus, IWorkStatus } from '@/constant/enums';
import moment from 'moment';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const withAsyncErrorHandlingPost = (
  fn: (...args: any[]) => Promise<any>,
  displaySnackbar?: (
    type: 'success' | 'error' | 'warning',
    message: string
  ) => void,
  onError?: (error: ICustomErrorResponse) => void
) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      const customError = error as ICustomErrorResponse;
      onError?.(customError);
      displaySnackbar && displaySnackbar('error', customError.message);
      console.error('An error occurred:', error);
      return undefined;
    }
  };
};

export const generateUniqueUserName = (email: string) => {
  const frontPart = email.split('@')[0];
  const backPart = Math.random() * 10;
  return `${frontPart}${backPart.toFixed(0)}`;
};

export const getFirstLetterFromName = (name: string): string => {
  return name.slice(0, 1).toUpperCase();
};

interface DiffResult<T> {
  [key: string]: T;
}

export const findDifferenceBetweenObject = <T extends object>(
  objOne: T,
  objTwo: T
): Partial<DiffResult<any>> => {
  const differences: Partial<DiffResult<any>> = {};
  for (const key in objOne) {
    if (objOne.hasOwnProperty(key)) {
      const value1 = objOne[key];
      const value2 = objTwo[key];
      if (value1 !== value2) {
        differences[key] = value2;
      }
    }
  }

  return differences;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (number: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(number);
};

export const splitRoute = (route: string) => {
  const parts = route.split('/');
  return parts[1] ?? '';
};

export const formatDateFromNow = (date: string | Date | undefined) => {
  return moment(date).fromNow();
};

export const dateFormat = (date: string | Date) => {
  return moment(date).format('D-MM-YYYY');
};
export const dateMonthFormat = (date: string | Date) => {
  return moment(date).format('D MMM,YYYY');
};

export const timeFormat = (date: string | Date) => {
  return moment(date).format('h:mm A');
};

export const getJobStatusTextByStatus = (status: IWorkStatus) => {
  switch (status) {
    case IWorkStatus.PART_TIME:
      return 'Part-time';
    case IWorkStatus.FULL_TIME:
      return 'Full-time';
    default:
      return status;
  }
};
export const getDocumentStatusTextByStatus = (status: IDocumentStatus) => {
  switch (status) {
    case IDocumentStatus.PENDING:
      return 'Pending';
    case IDocumentStatus.APPROVED:
      return 'Approved';
    case IDocumentStatus.DENIED:
      return 'Denied';
    default:
      return 'Pending';
  }
};

export const getDocumentStatusColor = (status: IDocumentStatus) => {
  switch (status) {
    case IDocumentStatus.PENDING:
      return '#FBC505';
    case IDocumentStatus.APPROVED:
      return '#469C73';
    case IDocumentStatus.DENIED:
      return '#C11919';
    case IDocumentStatus.UPDATE:
      return '#1985C1';
    default:
      return '#FBC505';
  }
};
