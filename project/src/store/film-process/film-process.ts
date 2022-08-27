import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmProcess} from '../../types/types';
import {fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction, setFavoriteFilmAction} from '../api-actions';

export const FILMS_PER_STEP = 8;

const initialState: FilmProcess = {
  isDataLoading: false,
  films: [],
  promoFilm: null,
  film: null,
  similarFilms: [],
  isServerAvailable: true,
  isFilmLoading: false
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
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(setFavoriteFilmAction.fulfilled,(state,action)=>{
        if(state.film?.id === action.payload.id) {
          state.film = action.payload;
        }
        if(state.promoFilm?.id === action.payload.id) {
          state.promoFilm = action.payload;
        }
      });
  }
});
