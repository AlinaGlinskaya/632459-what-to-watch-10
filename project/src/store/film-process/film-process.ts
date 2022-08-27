import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmProcess} from '../../types/types';
import {fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction} from '../api-actions';

export const FILMS_PER_STEP = 8;

const initialState: FilmProcess = {
  isDataLoading: false,
  films: [],
  promoFilm: null,
  film: null,
  similarFilms: [],
  isServerAvailable: true,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isDataLoading = false;
        state.isServerAvailable = true;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isServerAvailable = false;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      });
  }
});
