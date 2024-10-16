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
