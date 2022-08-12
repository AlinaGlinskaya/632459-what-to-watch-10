import {createAction} from '@reduxjs/toolkit';

export const changeFilter = createAction('main/changeFilter', (value) => ({
  payload: value,
}));
export const renderMoreFilms = createAction('main/renderMoreFilms');
export const resetFilters = createAction('main/resetFilters');
export const getFilms = createAction('main/getFilms');
