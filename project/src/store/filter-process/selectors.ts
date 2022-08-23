import {NameSpace} from '../../const';
import {FilterProcess, State} from '../../types/types';

export const getActiveFilter = (state: State): FilterProcess['activeFilter'] => state[NameSpace.Filter].activeFilter;
export const getFilteredFilms = (state: State): FilterProcess['filteredFilms'] => state[NameSpace.Filter].filteredFilms;
export const getFilters = (state: State): FilterProcess['filters'] => state[NameSpace.Filter].filters;
export const getRenderedFilmsCount = (state: State): FilterProcess['renderedFilmsCount'] => state[NameSpace.Filter].renderedFilmsCount;
