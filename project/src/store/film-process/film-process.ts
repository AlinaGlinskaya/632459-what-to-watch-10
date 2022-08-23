import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmProcess} from '../../types/types';
import {fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction} from '../api-actions';


export const FILMS_PER_STEP = 8;

const initialState: FilmProcess = {
  isDataLoading: false,
  films: [],
  filteredFilms: [],
  promoFilm: null,
  film: null,
  similarFilms: []
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
        state.filteredFilms = action.payload;
        state.isDataLoading = false;
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
