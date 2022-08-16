import {createAction} from '@reduxjs/toolkit';
import {FilmsMainProps, FilmMain} from '../types/types';
import { AuthorizationStatus } from '../const';

export const changeFilter = createAction('main/changeFilter', (value) => ({
  payload: value,
}));
export const renderMoreFilms = createAction('main/renderMoreFilms');
export const resetFilters = createAction('main/resetFilters');
export const loadFilms = createAction<FilmsMainProps['films']>('data/loadFilms');
export const loadPromoFilm = createAction<FilmMain>('data/loadPromoFilm');
export const setError = createAction<string | null>('main/setError');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
