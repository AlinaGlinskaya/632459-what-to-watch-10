import {changeFilter} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {MouseEvent} from 'react';
import {FilmsMainProps} from '../../types/types';
import {FiltersList} from '../../const';

function Filters({films}: FilmsMainProps) {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.activeFilter);

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (evt.currentTarget !== null && evt.currentTarget.id !== 'all') {
      dispatch(changeFilter(evt.currentTarget.id));
    }
  };

  const genres: (keyof typeof FiltersList)[] = ['All'];
  films.map((item) => genres.push(item.genre));
  const filters = [...new Set(genres)];

  const items = filters.map((item) => (
    <li key={item} className={`catalog__genres-item ${activeFilter === item ? 'catalog__genres-item--active' : ''}`}>
      <a href="/#" onClick={handleLinkClick} id={item} className="catalog__genres-link">{FiltersList[`${item}`]}</a>
    </li>));
  return (
    <ul className="catalog__genres-list">
      {items}
    </ul>
  );
}

export default Filters;
