import { useGetMoviesInfiniteQuery } from '../../features/api/moviesApi';
import MoviePreview from '../../components/MoviePreview/MoviePreview';
import { useEffect, useRef } from 'react';
import Skeleton from '../../components/MoviePreview/Skeleton';
import Message from '../../components/Message/Message';

import s from './Home.module.css';

const Home: React.FC = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, isError } =
    useGetMoviesInfiniteQuery('', { initialPageParam: 1 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.docs) ?? [];

  const skeletons = [...Array(8)].map((_, index) => <Skeleton key={index} />);
  console.log(movies);

  return (
    <main>
      <div className={s.movies}>
        {isLoading && skeletons}
        {isError && <Message>Произошла ошибка. Повторите попытку позже</Message>}
        {movies.map(
          (movie) => (
            // movie?.poster?.previewUrl && movie.name ? (
            <MoviePreview
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.name,
                img: movie.poster?.previewUrl || '',
                year: movie.year,
                rating: movie.rating?.kp || 0,
              }}
            />
          ),
          // ) : null,
        )}
      </div>
      <div ref={observerRef}></div>
    </main>
  );
};

export default Home;
