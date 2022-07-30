import {FilmsMainProps} from '../../types/types';
import FilmCard from '../film-card/film-card';

function FilmsList({films}: FilmsMainProps) {
  const items = films.map((item) => (
    <FilmCard
      id={item.id}
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
