import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/types';

const loadFavorites = (): Movie[] => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Movie[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: {
    addFavorite(state, action: PayloadAction<Movie>) {
      const exists = state.find((m) => m.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        saveFavorites(state);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const updated = state.filter((m) => m.id !== action.payload);
      saveFavorites(updated);
      return updated;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
