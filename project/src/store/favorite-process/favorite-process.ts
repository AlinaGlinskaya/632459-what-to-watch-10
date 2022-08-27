import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchFavoriteFilmsAction, setFavoriteFilmAction} from '../api-actions';
import {FavoriteProcess, FilmMain} from '../../types/types';

const initialState: FavoriteProcess = {
  favoriteFilms: [],
  updatedFilm: null,
  films: []
};

const setUpdatedFilm = (films: FilmMain[], updatedFilm: FilmMain) => {
  const filmToUpdate = films.find((film: FilmMain) => film.id === updatedFilm?.id);
  if (filmToUpdate) {
    const filmIndex = films.indexOf(filmToUpdate);
    films[filmIndex] = updatedFilm;
  }
  return films;
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(setFavoriteFilmAction.fulfilled, (state, action) => {
        state.updatedFilm = action.payload;
        state.films = setUpdatedFilm(state.films, state.updatedFilm);
      });
  }
});
