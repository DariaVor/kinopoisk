import { useParams } from 'react-router';
import { useGetMovieByIdQuery } from '../../features/api/moviesApi';
import Message from '../../components/Message/Message';

import s from './Movie.module.css';

const Movie: React.FC = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const { data: movie, isLoading, isError } = useGetMovieByIdQuery(movieId);

  if (isLoading) return <Message>Загрузка...</Message>;
  if (isError || !movie) return <Message>Ошибка при загрузке фильма. Повторите позже.</Message>;

  return (
    <div className={s.wrapper}>
      {movie.poster?.url ? (
        <img className={s.poster} src={movie.poster.url} alt={movie.name} />
      ) : (
        <div className={s.noPoster}>Нет постера</div>
      )}

      <div className={s.content}>
        <h1 className={s.title}>{movie.name}</h1>

        <div className={s.info}>
          <span>Рейтинг: {movie.rating.kp?.toFixed(1) || 'N/A'}</span>
          <span>
            Дата выхода:{' '}
            {movie.premiere?.world
              ? new Date(movie.premiere.world).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'неизвестна'}
          </span>
        </div>

        <div className={s.genres}>
          {movie.genres.map((genre) => (
            <span key={genre.name} className={s.chip}>
              {genre.name}
            </span>
          ))}
        </div>

        <p className={s.description}>{movie.description || 'Описание недоступно'}</p>
      </div>
    </div>
  );
};

export default Movie;
