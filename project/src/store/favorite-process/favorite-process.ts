import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchFavoriteFilmsAction, setFavoriteFilmAction} from '../api-actions';
import {FavoriteProcess} from '../../types/types';

const initialState: FavoriteProcess = {
  favoriteFilms: [],
  films: []
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
        if(!action.payload.isFavorite){
          state.favoriteFilms = (state.favoriteFilms).filter((film)=>film.id !== action.payload.id);
        }
        else{
          const favoriteFilmIndex = (state.favoriteFilms).findIndex((film) => film.id !== action.payload.id);
          const newFavoriteFilms = (state.favoriteFilms);

          if(favoriteFilmIndex >= 0) {
            newFavoriteFilms[favoriteFilmIndex] = action.payload;
          }
          else{
            newFavoriteFilms.push(action.payload);
          }
          state.favoriteFilms = newFavoriteFilms;
        }
      });
  }
});
