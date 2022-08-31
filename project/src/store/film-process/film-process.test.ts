import {FilmProcess} from '../../types/types';
import {fetchFilmsAction, fetchFilmAction, fetchPromoFilmAction, fetchSimilarFilmsAction, setFavoriteFilmAction} from '../api-actions';
import {filmProcess} from './film-process';
import {makeFakeFilm} from '../../utils/mock';

const mockFilms = Array.from({length: 5}, () => makeFakeFilm());
const mockFilm = makeFakeFilm();
const mockPromoFilm = makeFakeFilm();
const filmFavoriteChanged = {...mockFilm, isFavorite: !mockFilm.isFavorite};
const promoFilmFavoriteChanged = {...mockPromoFilm, isFavorite: !mockPromoFilm.isFavorite};

describe('Reducer: filmProcess', () => {
  let state: FilmProcess;

  beforeEach(() => {
    state = {
      isDataLoading: false,
      films: [],
      promoFilm: null,
      film: null,
      similarFilms: [],
      isServerAvailable: true,
      isFilmLoading: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isDataLoading: false,
        films: [],
        promoFilm: null,
        film: null,
        similarFilms: [],
        isServerAvailable: true,
        isFilmLoading: false
      });
  });

  describe('fetchFilmsAction test', () => {

    it('should set "isDataLoading": true if films are loading', () => {
      expect(filmProcess.reducer(state, {type: fetchFilmsAction.pending.type}))
        .toEqual({
          isDataLoading: true,
          films: [],
          promoFilm: null,
          film: null,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });

    it('should update films by load films, set "isDataLoading": false and "isServerAvailable": true', () => {
      expect(filmProcess.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: mockFilms}))
        .toEqual({
          isDataLoading: false,
          films: mockFilms,
          promoFilm: null,
          film: null,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });

    it('should set "isDataLoading": false and "isServerAvailable": false, if films loading failed', () => {
      expect(filmProcess.reducer(state, {type: fetchFilmsAction.rejected}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: null,
          film: null,
          similarFilms: [],
          isServerAvailable: false,
          isFilmLoading: false
        });
    });
  });

  describe('fetchFilmAction test', () => {

    it('should set "isFilmLoading": true if film is loading', () => {
      expect(filmProcess.reducer(state, {type: fetchFilmAction.pending.type}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: null,
          film: null,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: true
        });
    });

    it('should update film by load film, set "isFilmLoading": false', () => {
      expect(filmProcess.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: mockFilm}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: null,
          film: mockFilm,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });

    it('should set "isFilmLoading": false if film loading failed', () => {
      expect(filmProcess.reducer(state, {type: fetchFilmAction.rejected.type}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: null,
          film: null,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });
  });

  describe('fetchPromoFilmAction test', () => {

    it('should update promoFilm by loading promoFilm', () => {
      expect(filmProcess.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: mockPromoFilm}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: mockPromoFilm,
          film: null,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });
  });

  describe('fetchSimilarFilmsAction test', () => {

    it('should update similarFilms by loading similarFilms', () => {
      expect(filmProcess.reducer(state, {type: fetchSimilarFilmsAction.fulfilled.type, payload: mockFilms}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: null,
          film: null,
          similarFilms: mockFilms,
          isServerAvailable: true,
          isFilmLoading: false
        });
    });
  });

  describe('setFavoriteFilmAction test', () => {

    it('should update film by changing favorite status', () => {
      const stateWithLoadedFilm = {
        isDataLoading: false,
        films: [],
        promoFilm: null,
        film: mockFilm,
        similarFilms: [],
        isServerAvailable: true,
        isFilmLoading: false
      };
      expect(filmProcess.reducer(stateWithLoadedFilm, {type: setFavoriteFilmAction.fulfilled.type, payload: filmFavoriteChanged}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: null,
          film: filmFavoriteChanged,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });

    it('should update promoFilm by changing favorite status', () => {
      const stateWithLoadedFilm = {
        isDataLoading: false,
        films: [],
        promoFilm: mockPromoFilm,
        film: null,
        similarFilms: [],
        isServerAvailable: true,
        isFilmLoading: false
      };
      expect(filmProcess.reducer(stateWithLoadedFilm, {type: setFavoriteFilmAction.fulfilled.type, payload: promoFilmFavoriteChanged}))
        .toEqual({
          isDataLoading: false,
          films: [],
          promoFilm: promoFilmFavoriteChanged,
          film: null,
          similarFilms: [],
          isServerAvailable: true,
          isFilmLoading: false
        });
    });
  });
});
