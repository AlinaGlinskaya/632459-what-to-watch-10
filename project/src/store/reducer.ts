import {createReducer} from '@reduxjs/toolkit';
import {loadPromoFilm,
  loadComments, setError, setDataLoadingStatus, setUserData, loadFilm, loadSimilarFilms, setPostingStatus} from './action';
import {InitialState} from '../types/types';

export const FILMS_PER_STEP = 8;

const initialState: InitialState = {
  isDataLoading: false,
  error: null,
  promoFilm: null,
  userData: null,
  film: null,
  similarFilms: [],
  comments: [],
  isPosting: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setPostingStatus, (state, action) => {
      state.isPosting = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};


