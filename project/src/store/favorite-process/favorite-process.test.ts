import {FavoriteProcess} from '../../types/types';
import {favoriteProcess} from './favorite-process';
import {makeFakeFilm} from '../../utils/mock';
import {fetchFavoriteFilmsAction, setFavoriteFilmAction} from '../api-actions';
import {generateRandomInteger} from '../../utils';

const favoriteFilms = Array.from({length: 17}, () => makeFakeFilm());
const film = favoriteFilms[generateRandomInteger(0, favoriteFilms.length)];
const updatedFilm = {...film, isFavorite: !film.isFavorite};

const getUpdatedFavorites = () => {
  if (!updatedFilm.isFavorite) {
    const updatedFavorites = favoriteFilms.filter((item) => item.id !== updatedFilm.id);
    return updatedFavorites;
  }
  const favoriteFilmIndex = favoriteFilms.findIndex((item) => item.id !== updatedFilm.id);
  const newFavoriteFilms = favoriteFilms;

  if (favoriteFilmIndex >= 0) {
    newFavoriteFilms[favoriteFilmIndex] = updatedFilm;
  }
  else {
    newFavoriteFilms.push(updatedFilm);
  }

  return newFavoriteFilms;
};

describe('Reducer: favoriteProcess', () => {
  let state: FavoriteProcess;

  beforeEach(() => {
    state = {films: [], favoriteFilms: []};
  });

  it('without additional parameters should return initial state', () => {
    expect(favoriteProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({films: [], favoriteFilms: []});
  });

  it('should update favorite films by load favorite', () => {
    expect(favoriteProcess.reducer(state, {type: fetchFavoriteFilmsAction.fulfilled.type, payload: favoriteFilms}))
      .toEqual({films: [], favoriteFilms: favoriteFilms});
  });

  it('should update favorite films by changing film favorite status', () => {
    const stateWithLoadedFavorites = {films: [], favoriteFilms: favoriteFilms};
    expect(favoriteProcess.reducer(stateWithLoadedFavorites, {type: setFavoriteFilmAction.fulfilled.type, payload: updatedFilm}))
      .toEqual({films: [], favoriteFilms: getUpdatedFavorites()});
  });
});
