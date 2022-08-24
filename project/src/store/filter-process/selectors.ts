import {FILTER_DEFAULT, NameSpace} from '../../const';
import {FilterProcess, FilmProcess, State} from '../../types/types';
import {createSelector} from 'reselect';

export const getActiveFilter = (state: State): FilterProcess['activeFilter'] => state[NameSpace.Filter].activeFilter;
export const getFilters = (state: State): FilterProcess['filters'] => state[NameSpace.Filter].filters;
export const getFilms = (state: State): FilmProcess['films'] => state[NameSpace.Film].films;
export const getRenderedFilmsCount = (state: State): FilterProcess['renderedFilmsCount'] => state[NameSpace.Filter].renderedFilmsCount;

export const getFilteredFilms = createSelector(
  [getFilms, getActiveFilter],
  (films, activeFilter) => (activeFilter === FILTER_DEFAULT) ? films : films.filter((film) => film.genre === activeFilter)
);
