import { useSelector } from 'react-redux';
import type { RootState } from '../../features/store';
import MoviePreview from '../../components/MoviePreview/MoviePreview';
import Message from '../../components/Message/Message';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <section>
      {favorites.length === 0 ? (
        <Message>Список избранных пуст.</Message>
      ) : (
        <div className="movies">
          {favorites.map((movie) => (
            <MoviePreview
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.name,
                img: movie.poster?.previewUrl || '',
                year: movie.year,
                rating: movie.rating.kp || 0,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
