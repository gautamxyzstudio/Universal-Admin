import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    console.log(
      '############################## headers ######################################'
    );
    console.log('prepareHeaders', api);
    console.log('headers ------', headers);
    console.log(
      '############################## headers end ######################################'
    );
    return headers;
  },
});

const queryFetcher = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
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

  console.log(
    '\n############################## Result End ######################################'
  );
  console.log(JSON.stringify(result));
  console.log(
    '\n############################## Result End ######################################'
  );
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: queryFetcher,
  endpoints: () => ({}),
});
