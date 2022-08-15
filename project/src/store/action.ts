import {createAction} from '@reduxjs/toolkit';
import {FilmsMainProps, FilmMain} from '../types/types';

export const changeFilter = createAction('main/changeFilter', (value) => ({
  payload: value,
}));
export const renderMoreFilms = createAction('main/renderMoreFilms');
export const resetFilters = createAction('main/resetFilters');
export const getFilms = createAction('main/getFilms');
export const loadFilms = createAction<FilmsMainProps['films']>('data/loadFilms');
export const loadPromoFilm = createAction<FilmMain>('data/loadPromoFilm');
export const setError = createAction<string | null>('main/setError');
