export interface Movie {
  id: number;
  name: string;
  year: number;
  description?: string;
  rating: {
    kp: number;
  };
  poster?: {
    url: string;
    previewUrl: string;
  };
  genres: { name: string }[];
}

export interface MoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
