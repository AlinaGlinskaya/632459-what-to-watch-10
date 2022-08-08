import {createReducer} from '@reduxjs/toolkit';
import {changeFilter, getFilms} from './action';
import { films } from '../mocks/films';

const initialState = {
  activeFilter: 'All',
  films: films
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.activeFilter = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = films;
    });
});

export {reducer};


