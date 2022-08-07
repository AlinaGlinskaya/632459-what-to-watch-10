import {FilmsMainProps} from '../../types/types';
import FilmCard from '../film-card/film-card';

function FilmsList({films}: FilmsMainProps) {
  const items = films.map((item) => (
    <FilmCard
      film={item}
      key={item.id}
    />));
  return (
    <div className="catalog__films-list">
      {items}
    </div>
  );
}

export default FilmsList;
