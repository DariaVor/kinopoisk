import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMovieByIdQuery } from '@features/api/moviesApi';
import { addFavorite, removeFavorite } from '@features/favorites/favoritesSlice';
import type { RootState } from '@features/store';
import { useConfirmationModal } from '@hooks/useConfirmationModal';
import { ConfirmModal, Loader, Message } from '@components';
import { maxDescription } from '@constants';

import s from './Movie.module.css';

const Movie: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieId = Number(id);
  const { data: movie, isLoading, isError } = useGetMovieByIdQuery(movieId);

  const favorites = useSelector((state: RootState) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movieId);

  const { action, isOpen, open, close } = useConfirmationModal();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleConfirm = () => {
    if (!movie) return;
    if (action === 'add') dispatch(addFavorite(movie));
    if (action === 'remove') dispatch(removeFavorite(movieId));
    close();
  };

  const toggleDescription = () => setIsExpanded((prev) => !prev);

  if (isLoading) return <Loader />;
  if (isError || !movie) return <Message>Произошла ошибка. Повторите попытку позже.</Message>;

  const isLongDescription = movie.description && movie.description.length > maxDescription;

  return (
    <div className={s.wrapper}>
      {movie.poster?.previewUrl ? (
        <img className={s.poster} src={movie.poster.previewUrl} alt={movie.name} />
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

        <p className={`${s.description} ${!isExpanded && isLongDescription ? s.clamped : ''}`}>
          {movie.description || 'Описание недоступно'}
        </p>

        {isLongDescription && (
          <button className={s.toggleBtn} onClick={toggleDescription}>
            {isExpanded ? 'Скрыть' : 'Читать дальше'}
          </button>
        )}

        <button
          className={`${s.btn} ${isFavorite ? s.btnRemove : s.btnAdd}`}
          onClick={isFavorite ? () => open('remove') : () => open('add')}
        >
          {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        </button>

        <ConfirmModal
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={close}
          text={action === 'add' ? 'Добавить фильм в избранное?' : 'Удалить фильм из избранного?'}
        />
      </div>
    </div>
  );
};

export default Movie;
