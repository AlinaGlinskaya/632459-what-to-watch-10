import {createAction} from '@reduxjs/toolkit';
import {FilmMain, UserData} from '../types/types';
import {AppRoute} from '../const';

export const loadPromoFilm = createAction<FilmMain>('data/loadPromoFilm');
export const setError = createAction<string | null>('main/setError');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const setUserData = createAction<UserData>('user/setUserData');
export const loadFilm = createAction('data/loadFilm', (value) => ({
  payload: value,
}));
export const loadSimilarFilms = createAction('data/loadSimilarFlms', (value) => ({
  payload: value,
}));
export const loadComments = createAction('data/loadComments', (value) => ({
  payload: value,
}));
export const addComment = createAction('data/addComment');
export const setPostingStatus = createAction<boolean>('data/setPostingStatus');
export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
