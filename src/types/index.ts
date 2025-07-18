export interface Movie {
  id: number;
  name: string;
  year: number;
  description?: string;
  rating: {
    kp: number;
  };
  poster?: {
    previewUrl: string;
  };
  genres: { name: string }[];
  premiere?: {
    world?: string;
  };
}

export interface MoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface MovieFilters {
  genres?: string;
  ratingFrom?: string;
  ratingTo?: string;
  yearFrom?: string;
  yearTo?: string;
}
