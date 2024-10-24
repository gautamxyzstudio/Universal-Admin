/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserDetailsFromCookies } from '@/utility/cookies';
import {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformErrorResponse } from './types';
import { STRINGS } from '@/constant/en';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const token = getUserDetailsFromCookies()?.token;
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    if (api.endpoint === 'uploadFile') {
      headers.delete('Content-Type');
      headers.delete('Accept');
    }
    if (api.endpoint === 'addNewSubAdmin') {
      headers.delete('Authorization');
    } else {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    console.log(
      '############################## API DETAILS START######################################'
    );
    console.log('prepareHeaders', JSON.stringify(api));
    console.log(
      '############################## API DETAILS END ######################################'
    );
    console.log(
      '############################## headers ######################################'
    );
    console.log('headers ------', JSON.stringify(headers));
    console.log(
      '############################## headers end ######################################'
    );
    return headers;
  },
});

const queryFetcher = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
): Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
  console.log(
    '\n############################## Request ######################################',
    '\n API ------',
    args.url,
    '\n Api request ------',
    JSON.stringify(args),
    '\napi name ------',
    JSON.stringify(api)
  );
  console.log(
    '\n############################## Request End ######################################'
  );
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 'FETCH_ERROR') {
      return {
        error: {
          message: STRINGS.your_internet_is_a_little_wonky_right_now,
          statusCode: 0,
        } as any,
      };
    } else if (result.error.status === 'PARSING_ERROR') {
      const transformedError = transformErrorResponse(result.error.data as any);
      return { error: transformedError as any };
    } else {
      const transformedError = transformErrorResponse(result.error.data as any);
      return { error: transformedError as any };
    }
  }

  console.log(
    '\n############################## Result START ######################################'
  );
  console.log(JSON.stringify(result));
  console.log(
    '\n############################## Result End ######################################'
  );
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: queryFetcher as any,
  endpoints: () => ({}),
});
