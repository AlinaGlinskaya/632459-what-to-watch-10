import {changeFilter} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {MouseEvent} from 'react';
import {FiltersList} from '../../const';
import { filters } from '../../store/reducer';

function Filters() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.activeFilter);

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (evt.currentTarget !== null) {
      dispatch(changeFilter(evt.currentTarget.id));
    }
  };

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
