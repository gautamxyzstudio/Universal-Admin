/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ICustomErrorResponse } from '@/api/types';

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
