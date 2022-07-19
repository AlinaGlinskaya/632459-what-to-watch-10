import {AppScreenProps} from '../../types/types';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';

function FilmsList({films}: AppScreenProps) {
  const setActiveFilmId = useState<number|undefined>()[1];
  const items = films.map((item) => <FilmCard onMouseOver={() => setActiveFilmId(item.id)} title={item.title} img={item.img} key={item.id}></FilmCard>);
  return (
    <div className="catalog__films-list">
      {items}
    </div>
  );
}

export default FilmsList;
