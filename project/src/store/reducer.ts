import {createReducer} from '@reduxjs/toolkit';
import {changeFilter, getFilms, renderMoreFilms} from './action';
import {films} from '../mocks/films';
import {FILTER_DEFAULT} from '../const';
import { FiltersList } from '../const';

export const FILMS_PER_STEP = 8;

const genres: (keyof typeof FiltersList)[] = [FILTER_DEFAULT];
films.map((item) => genres.push(item.genre));
export const filters = [...new Set(genres)];

const initialState = {
  activeFilter: FILTER_DEFAULT,
  films: films,
  renderedFilmsCount: FILMS_PER_STEP
};

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
    .addCase(getFilms, (state) => {
      state.films = films;
    });
});

export {reducer};


