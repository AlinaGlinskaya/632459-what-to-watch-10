import {createReducer} from '@reduxjs/toolkit';
import {changeFilter, loadFilms, renderMoreFilms, resetFilters} from './action';
import {FILTER_DEFAULT} from '../const';
import {FiltersList} from '../const';
import {InitialState} from '../types/types';

export const FILMS_PER_STEP = 8;

const initialState: InitialState = {
  activeFilter: FILTER_DEFAULT,
  films: [],
  renderedFilmsCount: FILMS_PER_STEP
};

const films = initialState.films;

const genres: (keyof typeof FiltersList)[] = [FILTER_DEFAULT];
films.map((item) => genres.push(item.genre));
export const filters = [...new Set(genres)];

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.activeFilter = action.payload;
      state.films = films.filter((film) => state.activeFilter === FILTER_DEFAULT ? true : film.genre === state.activeFilter);
      state.renderedFilmsCount = FILMS_PER_STEP;
    })
    .addCase(renderMoreFilms, (state) => {
      state.renderedFilmsCount += FILMS_PER_STEP;
    })
    .addCase(resetFilters, (state) => {
      state.activeFilter = FILTER_DEFAULT;
      state.films = films.filter((film) => state.activeFilter === FILTER_DEFAULT ? true : film.genre === state.activeFilter);
      state.renderedFilmsCount = FILMS_PER_STEP;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    });
});

export {reducer};


