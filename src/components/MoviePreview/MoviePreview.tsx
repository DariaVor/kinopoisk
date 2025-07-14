import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice';
import type { RootState } from '../../features/store';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useConfirmationModal } from '../../hooks/useConfirmationModal';

import s from './MoviePreview.module.css';

interface MoviePreviewProps {
  id: number;
  title: string;
  img?: string;
  year: number;
  rating: number;
}

const MoviePreview: React.FC<{ movie: MoviePreviewProps }> = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const { action, isOpen, open, close } = useConfirmationModal();

  const handleConfirm = () => {
    if (action === 'add') {
      dispatch(
        addFavorite({
          id: movie.id,
          name: movie.title,
          year: movie.year,
          rating: { kp: movie.rating },
          poster: { previewUrl: movie.img || '' },
          genres: [],
        }),
      );
    } else if (action === 'remove') {
      dispatch(removeFavorite(movie.id));
    }
    close();
  };

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <>
      <Link to={`/movie/${movie.id}`} className={s.link}>
        <div className={s.wrapper}>
          {movie.img ? (
            <img src={movie.img} alt={movie.title} />
          ) : (
            <div className={s.noImage}>Нет постера</div>
          )}
          <p
            className={`${s.rating} ${
              movie.rating < 4 ? s.low : movie.rating < 7 ? s.medium : s.high
            }`}
          >
            {movie.rating.toFixed(1)}
          </p>
          <div className={s.info}>
            <p className={s.title}>{movie.title}</p>
            <p className={s.year}>{movie.year}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isFavorite) {
                open('remove');
              } else {
                open('add');
              }
            }}
            className={`${s.favBtn} ${isFavorite ? s.active : ''}`}
            aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <svg
              className={`${s.favIcon} ${isFavorite ? s.active : ''}`}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" />
            </svg>
          </button>
        </div>
      </Link>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={close}
        text={action === 'add' ? 'Добавить фильм в избранное?' : 'Удалить фильм из избранного?'}
      />
    </>
  );
};

export default MoviePreview;
