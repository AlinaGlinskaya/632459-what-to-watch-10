import {SimilarFilmsProps} from '../../types/types';
import FilmCard from '../film-card/film-card';

function SimilarFilmsList({films, film}: SimilarFilmsProps) {
  const MAX_SIMILAR_FILMS_COUNT = 4;
  let noSimilarFilms = false;

  const getSimilarFilms = () => {
    const similarFilms = films.filter((element) => (element.genre === film.genre) && (element.id !== film.id));
    if (similarFilms.length === 0) {
      noSimilarFilms = true;
      return similarFilms;
    }
    if (similarFilms.length > MAX_SIMILAR_FILMS_COUNT && similarFilms) {
      return similarFilms.slice(0, MAX_SIMILAR_FILMS_COUNT);
    }
    return similarFilms;
  };

  const filmsList = getSimilarFilms();

  const items = filmsList.map((item) => (
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
      {noSimilarFilms && <p>There are no films like this in our database</p>}
    </div>
  );
}

export default SimilarFilmsList;
