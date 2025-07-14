import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, MoviesResponse, MovieFilters } from '../../types/types';

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
        const query = Object.fromEntries(new URLSearchParams(queryArg)) as MovieFilters;

        return {
          url: `/movie`,
          params: {
            page: pageParam,
            limit: 50,
            notNullFields: 'poster.url',
            'genres.name': query.genres?.split(','),
            'rating.kp':
              query.ratingFrom && query.ratingTo
                ? `${query.ratingFrom}-${query.ratingTo}`
                : undefined,
            year: query.yearFrom && query.yearTo ? `${query.yearFrom}-${query.yearTo}` : undefined,
            sortField: 'rating.kp',
            sortType: -1,
          },
        };
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (_lastPage, _allPages, lastPageParam) => lastPageParam + 1,
      },
    }),
    getMovieById: build.query<Movie, number>({
      query: (id) => `/movie/${id}`,
    }),
  }),
});

export const { useGetMoviesInfiniteQuery, useGetMovieByIdQuery } = moviesApi;
