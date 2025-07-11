import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MoviesResponse } from '../../types/types';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', import.meta.env.VITE_KINOPOISK_API_KEY);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMovies: build.infiniteQuery<MoviesResponse, string, number>({
      query: ({ queryArg, pageParam }) => {
        return {
          url: `/movie`,
          params: {
            page: pageParam,
            limit: 50,
            ...Object.fromEntries(new URLSearchParams(queryArg)),
          },
        };
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (_lastPage, _allPages, lastPageParam) => lastPageParam + 1,
      },
    }),
  }),
});

export const { useGetMoviesInfiniteQuery } = moviesApi;
