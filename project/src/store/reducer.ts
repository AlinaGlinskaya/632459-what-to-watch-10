import {createReducer} from '@reduxjs/toolkit';
import {changeFilter, loadFilms, loadPromoFilm, renderMoreFilms, resetFilters, setError, setDataLoadedStatus} from './action';
import {FILTER_DEFAULT} from '../const';
import {FiltersList} from '../const';
import {FilmMain, InitialState} from '../types/types';

export const FILMS_PER_STEP = 8;

const initialState: InitialState = {
  activeFilter: FILTER_DEFAULT,
  films: [],
  filteredFilms: [],
  isDataLoaded: false,
  renderedFilmsCount: FILMS_PER_STEP,
  error: null,
  filters: [],
  promoFilm: null
};

const setFilters = (films: FilmMain[]) => {
  const genres: (keyof typeof FiltersList)[] = [FILTER_DEFAULT];
  films.map((item: FilmMain) => genres.push(item.genre));
  const filters = [...new Set(genres)];
  return filters;
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.activeFilter = action.payload;
      state.filteredFilms = state.films.filter((film) => state.activeFilter === FILTER_DEFAULT ? true : film.genre === state.activeFilter);
      state.renderedFilmsCount = FILMS_PER_STEP;
    })
    .addCase(renderMoreFilms, (state) => {
      state.renderedFilmsCount += FILMS_PER_STEP;
    })
    .addCase(resetFilters, (state) => {
      state.activeFilter = FILTER_DEFAULT;
      state.filteredFilms = state.films;
      state.renderedFilmsCount = FILMS_PER_STEP;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filteredFilms = action.payload;
      state.filters = setFilters(state.films);
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};


