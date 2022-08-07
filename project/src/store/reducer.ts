import {createReducer} from '@reduxjs/toolkit';
import {changeFilter, resetFilters, getFilms} from './action';
import { films } from '../mocks/films';

const initialState = {
  activeFilter: 'all',
  films: films
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.activeFilter = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = films;
    })
    .addCase(resetFilters, (state) => {
      state.activeFilter = 'all';
    });
});

export {reducer};


