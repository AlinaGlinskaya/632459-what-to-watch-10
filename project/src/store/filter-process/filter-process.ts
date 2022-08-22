import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilterProcess} from '../../types/types';
import {FiltersList, FILTER_DEFAULT} from '../../const';
import {FilmMain} from '../../types/types';
import {fetchFilmsAction} from '../api-actions';

export const FILMS_PER_STEP = 8;

const initialState: FilterProcess = {
  activeFilter: FILTER_DEFAULT,
  films: [],
  filteredFilms: [],
  filters: [],
  renderedFilmsCount: FILMS_PER_STEP,
};

const setFilters = (films: FilmMain[]) => {
  const genres: (keyof typeof FiltersList)[] = [FILTER_DEFAULT];
  films.map((item: FilmMain) => genres.push(item.genre));
  const filters = [...new Set(genres)];
  return filters;
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
      state.filteredFilms = state.films.filter((film) => state.activeFilter === FILTER_DEFAULT ? true : film.genre === state.activeFilter);
      state.renderedFilmsCount = FILMS_PER_STEP;
    },
    renderMoreFilms: (state) => {
      state.renderedFilmsCount += FILMS_PER_STEP;
    },
    resetFilters: (state) => {
      state.activeFilter = FILTER_DEFAULT;
      state.filteredFilms = state.films;
      state.renderedFilmsCount = FILMS_PER_STEP;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = action.payload;
        state.filters = setFilters(state.films);
      });
  }
});
