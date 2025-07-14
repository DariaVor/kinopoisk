import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './api/moviesApi';
import favoritesReducer from './favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
