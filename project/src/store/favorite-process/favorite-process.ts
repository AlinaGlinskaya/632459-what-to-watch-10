import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchFavoriteFilmsAction} from '../api-actions';
import {FavoriteProcess} from '../../types/types';

const initialState: FavoriteProcess = {
  favoriteFilms: [],
  film: null
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      });
  }
});
