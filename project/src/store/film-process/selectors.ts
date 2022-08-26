import {NameSpace} from '../../const';
import {State, FilmProcess} from '../../types/types';

export const getIsDataLoading = (state: State): FilmProcess['isDataLoading'] => state[NameSpace.Film].isDataLoading;
export const getFilms = (state: State): FilmProcess['films'] => state[NameSpace.Film].films;
export const getPromoFilm = (state: State): FilmProcess['promoFilm'] => state[NameSpace.Film].promoFilm;
export const getFavoriteFilms = (state: State): FilmProcess['favoriteFilms'] => state[NameSpace.Film].favoriteFilms;
export const getFilm = (state: State): FilmProcess['film'] => state[NameSpace.Film].film;
export const getSimilarFilms = (state: State): FilmProcess['similarFilms'] => state[NameSpace.Film].similarFilms;
export const getIsServerAvailable = (state: State): FilmProcess['isServerAvailable'] => state[NameSpace.Film].isServerAvailable;
