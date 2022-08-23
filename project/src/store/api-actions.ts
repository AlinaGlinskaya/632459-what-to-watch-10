import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {FilmsMainProps, AppDispatch, State, FilmMain, AuthData, UserData, Comment, CommentData} from '../types/types';
import {saveToken, dropToken} from '../services/token';

export const fetchFilmsAction = createAsyncThunk<FilmMain[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmsMainProps['films']>(APIRoute.Films);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<FilmMain, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmMain>(APIRoute.Promo);
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<FilmMain, FilmMain['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilm',
  async (id, {extra: api}) => {
    const {data} = await api.get<FilmMain>(`${APIRoute.Films}/${id}`);
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<FilmMain[], FilmMain['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchSimilarFilms',
  async (id, {extra: api}) => {
    const {data} = await api.get<FilmMain[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], FilmMain['id'], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const addCommentAction = createAsyncThunk<void, [CommentData, FilmMain['id']], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addComment',
  async ([{comment, rating}, filmId], {extra: api}) => {
    await api.post<Comment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
