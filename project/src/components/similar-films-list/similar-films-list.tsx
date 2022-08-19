import {SimilarFilmsProps} from '../../types/types';
import FilmCard from '../film-card/film-card';

function SimilarFilmsList({films}: SimilarFilmsProps): JSX.Element {
  const MAX_SIMILAR_FILMS_COUNT = 4;
  let noSimilarFilms = false;

  if (films?.length === 0) {
    noSimilarFilms = true;
  }

  const filmsList = films?.slice(0, MAX_SIMILAR_FILMS_COUNT);

  const items = filmsList?.map((item) => (
    <FilmCard
      film={item}
      key={item.id}
    />));
  return (
    <div className="catalog__films-list">
      {items}
      {noSimilarFilms && <p>There are no films like this in our database</p>}
    </div>
  );
}

export default SimilarFilmsList;
