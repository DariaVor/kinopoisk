import s from './MoviePreview.module.css';

interface Movie {
  id: number;
  title: string;
  img: string;
  year: number;
  rating: number;
}

const MoviePreview: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className={s.wrapper}>
      <img src={movie.img} alt={movie.title} />
      <p className={s.rating}>{movie.rating}</p>
      <div className={s.info}>
        <p className={s.title}>{movie.title}</p>
        <p className={s.year}>{movie.year}</p>
      </div>
    </div>
  );
};

export default MoviePreview;
