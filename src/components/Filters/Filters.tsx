import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

import s from './Filters.module.css';

const genresList = ['боевик', 'комедия', 'драма', 'ужасы', 'фантастика'];

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genres, setGenres] = useState<string[]>([]);
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  useEffect(() => {
    setGenres(searchParams.get('genres')?.split(',') || []);
    setRatingFrom(searchParams.get('ratingFrom') || '');
    setRatingTo(searchParams.get('ratingTo') || '');
    setYearFrom(searchParams.get('yearFrom') || '');
    setYearTo(searchParams.get('yearTo') || '');
  }, [searchParams]);

  const updateParam = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const toggleGenre = (genre: string) => {
    const updated = genres.includes(genre) ? genres.filter((g) => g !== genre) : [...genres, genre];

    setGenres(updated);
    if (updated.length > 0) {
      searchParams.set('genres', updated.join(','));
    } else {
      searchParams.delete('genres');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const resetFilters = () => {
    setGenres([]);
    setRatingFrom('');
    setRatingTo('');
    setYearFrom('');
    setYearTo('');
    setSearchParams({});
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className={s.wrapper}>
      <div className={s.filter}>
        <label>Жанры</label>
        <div className={s.checkboxes}>
          {genresList.map((genre) => (
            <label key={genre} className={s.label}>
              <input
                type="checkbox"
                checked={genres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <div className={s.filter}>
        <label>Рейтинг</label>
        <div className={s.inputs}>
          <input
            type="number"
            min="0"
            max="10"
            placeholder="от"
            value={ratingFrom}
            onChange={(e) => {
              setRatingFrom(e.target.value);
              updateParam('ratingFrom', e.target.value);
            }}
          />
          <input
            type="number"
            min="0"
            max="10"
            placeholder="до"
            value={ratingTo}
            onChange={(e) => {
              setRatingTo(e.target.value);
              updateParam('ratingTo', e.target.value);
            }}
          />
        </div>
      </div>

      <div className={s.filter}>
        <label>Год выпуска</label>
        <div className={s.inputs}>
          <input
            type="number"
            min="1990"
            max={currentYear}
            placeholder="от"
            value={yearFrom}
            onChange={(e) => {
              setYearFrom(e.target.value);
              updateParam('yearFrom', e.target.value);
            }}
          />
          <input
            type="number"
            min="1990"
            max={currentYear}
            placeholder="до"
            value={yearTo}
            onChange={(e) => {
              setYearTo(e.target.value);
              updateParam('yearTo', e.target.value);
            }}
          />
        </div>
      </div>

      <button className={s.btn} onClick={resetFilters}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;
