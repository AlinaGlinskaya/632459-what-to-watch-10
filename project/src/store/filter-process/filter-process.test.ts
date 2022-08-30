import {FILTER_DEFAULT} from '../../const';
import { setFilters } from '../../utils';
import {makeFakeFilm} from '../../utils/mock';
import {changeFilter, FILMS_PER_STEP, filterProcess, renderMoreFilms, resetFilters, initFilters} from './filter-process';
import {generateRandomInteger} from '../../utils';

const films = Array.from({length: 5}, () => makeFakeFilm());

const filters = setFilters(films);
const activeFilter = filters[generateRandomInteger(0, filters.length)];

describe('Reducer: filterProcess', () => {

  it('without additional parameters should return initial state', () => {
    expect(filterProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({activeFilter: FILTER_DEFAULT, films: [], filters: [], renderedFilmsCount: FILMS_PER_STEP});
  });

  it('should change active filter and reset films count', () => {
    const state = {activeFilter: activeFilter, renderedFilmsCount: generateRandomInteger(0, 50), films: films, filters: filters};
    expect(filterProcess.reducer(state, changeFilter(activeFilter)))
      .toEqual({activeFilter: activeFilter, renderedFilmsCount: FILMS_PER_STEP, films: films, filters: filters});
  });

  it('should increase rendered films count on constant value', () => {
    const state = {activeFilter: activeFilter, renderedFilmsCount: FILMS_PER_STEP, films: films, filters: filters};
    expect(filterProcess.reducer(state, renderMoreFilms()))
      .toEqual({renderedFilmsCount: FILMS_PER_STEP + FILMS_PER_STEP, films: films, filters: filters, activeFilter: activeFilter});
  });

  it('should set default filter and reset films count', () => {
    const state = {activeFilter: activeFilter, renderedFilmsCount: FILMS_PER_STEP, films: films, filters: filters};
    expect(filterProcess.reducer(state, resetFilters()))
      .toEqual({activeFilter: FILTER_DEFAULT, renderedFilmsCount: FILMS_PER_STEP, films: films, filters: filters});
  });

  it('should set filters based on films genres', () => {
    const state = {activeFilter: activeFilter, renderedFilmsCount: FILMS_PER_STEP, films: films, filters: filters};
    expect(filterProcess.reducer(state, initFilters()))
      .toEqual({filters: setFilters(films), activeFilter: activeFilter, renderedFilmsCount: FILMS_PER_STEP, films: films});
  });
});
