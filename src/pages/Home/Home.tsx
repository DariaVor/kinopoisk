import MoviePreview from '../../components/MoviePreview/MoviePreview';

import s from './Home.module.css';

const movies = [
  {
    id: 1,
    title: 'Очень очень очень длинное название фильма',
    img: 'https://kinopoiskapiunofficial.tech/images/posters/kp/2022/07/26/1/4/1/4b0e0d5e-5c7d-4b3e-a3b9-3e2d0b2c6d2d.jpg',
    year: 2022,
    rating: 8.9,
  },
  {
    id: 2,
    title: 'Очень очень очень длинное название фильма',
    img: 'https://kinopoiskapiunofficial.tech/images/posters/kp/2022/07/26/1/4/1/4b0e0d5e-5c7d-4b3e-a3b9-3e2d0b2c6d2d.jpg',
    year: 2023,
    rating: 9.2,
  },
  {
    id: 3,
    title: 'Очень очень очень длинное название фильма',
    img: 'https://kinopoiskapiunofficial.tech/images/posters/kp/2022/07/26/1/4/1/4b0e0d5e-5c7d-4b3e-a3b9-3e2d0b2c6d2d.jpg',
    year: 2021,
    rating: 6.1,
  },
  {
    id: 4,
    title: 'Очень очень очень длинное название фильма',
    img: 'https://kinopoiskapiunofficial.tech/images/posters/kp/2022/07/26/1/4/1/4b0e0d5e-5c7d-4b3e-a3b9-3e2d0b2c6d2d.jpg',
    year: 2020,
    rating: 8.3,
  },
];

const Home: React.FC = () => {
  return (
    <main>
      <div className={s.movies}>
        {movies.map((movie) => (
          <MoviePreview key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
};
export default Home;
