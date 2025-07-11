import { useSearchParams } from 'react-router';
import { useGetMoviesInfiniteQuery } from '../../features/api/moviesApi';
import MoviePreview from '../../components/MoviePreview/MoviePreview';
import { useEffect, useRef } from 'react';
import Skeleton from '../../components/MoviePreview/Skeleton';
import Message from '../../components/Message/Message';
import Filters from '../../components/Filters/Filters';

import s from './Home.module.css';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const queryString = searchParams.toString();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, isError } =
    useGetMoviesInfiniteQuery(queryString, { initialPageParam: 1 });

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

  return (
    <main>
      <section>
        <Filters />
      </section>
      <section className={s.movies}>
        {isLoading && [...Array(8)].map((_, i) => <Skeleton key={i} />)}
        {isError && <Message>Произошла ошибка. Повторите попытку позже.</Message>}
        {movies.map((movie) => (
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
        ))}
      </section>
      <div ref={observerRef}></div>
    </main>
  );
};

export default Home;
