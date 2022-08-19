import {createReducer} from '@reduxjs/toolkit';
import {changeFilter, loadFilms, loadPromoFilm, renderMoreFilms, resetFilters, setError, setDataLoadingStatus, requireAuthorization, setUserData, loadFilm, loadSimilarFilms} from './action';
import {FILTER_DEFAULT, FiltersList, AuthorizationStatus} from '../const';
import {FilmMain, InitialState} from '../types/types';

export const FILMS_PER_STEP = 8;

const initialState: InitialState = {
  activeFilter: FILTER_DEFAULT,
  films: [],
  filteredFilms: [],
  isDataLoading: false,
  renderedFilmsCount: FILMS_PER_STEP,
  error: null,
  filters: [],
  promoFilm: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  film: null,
  similarFilms: null
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
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};


