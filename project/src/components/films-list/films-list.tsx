import {FilmsMainProps} from '../../types/types';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';

function FilmsList({films}: FilmsMainProps) {
  const [activeFilmId, setActiveFilmId] = useState<number | null>();
  const items = films.map((item) => (
    <FilmCard
      id={item.id}
      isActive={activeFilmId === item.id}
      onMouseEnter={() => setActiveFilmId(item.id)}
      onMouseLeave={() => setActiveFilmId(null)}
      title={item.name}
      img={item.previewImage}
      key={item.id}
      previewVideoLink={item.previewVideoLink}
      posterImage={item.posterImage}
    />));
  return (
    <div className="catalog__films-list">
      {items}
    </div>
  );
}

export default FilmsList;
