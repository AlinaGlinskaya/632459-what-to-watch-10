import {AppScreenProps} from '../../types/types';
import FilmCard from '../film-card/film-card';

function FilmsMain({films}: AppScreenProps) {
  const items = films.map((item) => <FilmCard title={item.title} img={item.img} key={item.id}></FilmCard>);
  return (
    <div className="catalog__films-list">
      {items}
    </div>
  );
}

export default FilmsMain;
