import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {FilmsMainProps, AppDispatch, State} from '../types/types';
import {loadFilms} from './action';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmsMainProps['films']>(APIRoute.Films);
    dispatch(loadFilms(data));
  },
);
