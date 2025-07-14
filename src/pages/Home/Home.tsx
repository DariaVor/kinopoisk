import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { useGetMoviesInfiniteQuery } from '@features/api/moviesApi';
import { Filters, Message, MoviePreview, Skeleton } from '@components';

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

  if (isError) return <Message>Произошла ошибка. Повторите попытку позже.</Message>;

  return (
    <main>
      <section>
        <Filters />
      </section>
      <section className="movies">
        {isLoading && [...Array(8)].map((_, i) => <Skeleton key={i} />)}
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
