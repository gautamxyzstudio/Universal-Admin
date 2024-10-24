'use client';
import { IAdmin } from '@/api/fetures/Auth/types';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const secretKey = process.env.SECRET_KEY;

export type IUserCookies = {
  token: string;
  userDetails: IAdmin | null;
};

// Save user details in cookies
export const saveUserDetailsInCookies = (data: IUserCookies) => {
  const stringifyData = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(
    stringifyData,
    secretKey ?? ''
  ).toString();
  Cookies.set('user', encryptedData);
};

// Get user details from cookies
export const getUserDetailsFromCookies = (): IUserCookies | null => {
  const storedEncryptedData = Cookies.get('user');
  if (storedEncryptedData) {
    const bytes = CryptoJS.AES.decrypt(storedEncryptedData, secretKey ?? '');
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
  return null;
};

export const removeUserDetailsFromCookies = () => {
  Cookies.remove('user');
};

export const extractFirstAndLastNameFromName = (
  name: string
): { firstName: string; lastName: string } => {
  if (name) {
    const nameParts = name.split(' ');
    return {
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
    };
  } else {
    return {
      firstName: '',
      lastName: '',
    };
  }
};
export const createImageUrl = (url: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
