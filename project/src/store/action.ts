import {createAction} from '@reduxjs/toolkit';

export const changeFilter = createAction('main/changeFilter', (value) => ({
  payload: value,
}));
export const getFilms = createAction('main/getFilms');
export const resetFilters = createAction('main/resetFilters');
