import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilterProcess} from '../../types/types';
import {FiltersList, FILTER_DEFAULT} from '../../const';
import {FilmMain} from '../../types/types';

export const FILMS_PER_STEP = 8;

const initialState: FilterProcess = {
  activeFilter: FILTER_DEFAULT,
  films: [],
  filters: [],
  renderedFilmsCount: FILMS_PER_STEP
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
      state.renderedFilmsCount = FILMS_PER_STEP;
    },
    renderMoreFilms: (state) => {
      state.renderedFilmsCount += FILMS_PER_STEP;
    },
    resetFilters: (state) => {
      state.activeFilter = FILTER_DEFAULT;
      state.renderedFilmsCount = FILMS_PER_STEP;
    },
    initFilters: (state) => {
      state.filters = setFilters(state.films);
    }
  },
  extraReducers: {}
});

export const {changeFilter, renderMoreFilms, resetFilters, initFilters} = filterProcess.actions;
