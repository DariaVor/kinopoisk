import { Link } from 'react-router';

import s from './MoviePreview.module.css';

interface MoviePreviewProps {
  movie: {
    id: number;
    title: string;
    img?: string;
    year: number;
    rating: number;
  };
}

const MoviePreview: React.FC<{ movie: MoviePreviewProps['movie'] }> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className={s.link}>
      <div className={s.wrapper}>
        {movie.img ? (
          <img src={movie.img} alt={movie.title} />
        ) : (
          <div className={s.noImage}>Нет постера</div>
        )}
        <p className={s.rating}>{movie.rating.toFixed(1)}</p>
        <div className={s.info}>
          <p className={s.title}>{movie.title}</p>
          <p className={s.year}>{movie.year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MoviePreview;
