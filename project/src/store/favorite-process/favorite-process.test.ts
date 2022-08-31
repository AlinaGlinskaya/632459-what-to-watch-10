import {FavoriteProcess} from '../../types/types';
import {favoriteProcess} from './favorite-process';
import {makeFakeFilm} from '../../utils/mock';
import {fetchFavoriteFilmsAction, setFavoriteFilmAction} from '../api-actions';
import {generateRandomInteger} from '../../utils';

const mockFavoriteFilms = Array.from({length: 17}, () => makeFakeFilm());
const film = mockFavoriteFilms[generateRandomInteger(0, (mockFavoriteFilms.length - 1))];
const updatedFilm = {...film, isFavorite: !film.isFavorite};

const getUpdatedFavorites = () => {
  if (!updatedFilm.isFavorite) {
    const updatedFavorites = mockFavoriteFilms.filter((item) => item.id !== updatedFilm.id);
    return updatedFavorites;
  }
  const favoriteFilmIndex = mockFavoriteFilms.findIndex((item) => item.id !== updatedFilm.id);
  const newFavoriteFilms = [...mockFavoriteFilms];

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
    expect(favoriteProcess.reducer(state, {type: fetchFavoriteFilmsAction.fulfilled.type, payload: mockFavoriteFilms}))
      .toEqual({films: [], favoriteFilms: mockFavoriteFilms});
  });

  it('should update favorite films by changing film favorite status', () => {
    const stateWithLoadedFavorites = {films: [], favoriteFilms: mockFavoriteFilms};
    expect(favoriteProcess.reducer(stateWithLoadedFavorites, {type: setFavoriteFilmAction.fulfilled.type, payload: updatedFilm}))
      .toEqual({films: [], favoriteFilms: getUpdatedFavorites()});
  });
});
