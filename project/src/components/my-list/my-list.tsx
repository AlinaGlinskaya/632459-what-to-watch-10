import FilmCard from '../film-card/film-card';
import {useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/film-process/selectors';

function MyList() {

  const films = useAppSelector(getFavoriteFilms);

  const items = films?.map((item) => (
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

export default MyList;
