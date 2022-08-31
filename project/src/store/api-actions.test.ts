import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State, AuthData} from '../types/types';
import {makeFakeComment, makeFakeCommentData, makeFakeFilm} from '../utils/mock';
import {APIRoute} from '../const';
import {addCommentAction, checkAuthAction, fetchCommentsAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction, loginAction, logoutAction, setFavoriteFilmAction } from './api-actions';
import {generateRandomInteger} from '../utils';
import {redirectToRoute} from './action';

describe('Async actions', () => {

  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch load films when GET /films', async () => {
    const mockFilms = Array.from({length: 25}, () => makeFakeFilm());

    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch load favorite films when GET /favorite', async () => {
    const mockFavoriteFilms = Array.from({length: 9}, () => makeFakeFilm());

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavoriteFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch change favorite film status when POST /favorite/{filmId}/{status}', async () => {
    const mockFilm = makeFakeFilm();
    const filmId = mockFilm.id;
    const status = mockFilm.isFavorite ? 0 : 1;

    const filmInResponse = {...mockFilm, isFavorite: !mockFilm.isFavorite};

    mockAPI
      .onPost(`${APIRoute.Favorite}/${filmId}/${status}`)
      .reply(200, filmInResponse);

    const store = mockStore();

    await store.dispatch(setFavoriteFilmAction({filmId, status}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setFavoriteFilmAction.pending.type,
      fetchFilmAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      setFavoriteFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch load promoFilm when GET /promo', async () => {
    const mockPromoFilm = makeFakeFilm();

    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromoFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch load film when GET /films/{filmId}', async () => {
    const mockFilm = makeFakeFilm();
    const filmId = mockFilm.id;

    mockAPI
      .onGet(`${APIRoute.Films}/${filmId}`)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(filmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch load similar films when GET /films/{filmId}/similar', async () => {
    const mockFilms = Array.from({length: 4}, () => makeFakeFilm());
    const filmId = generateRandomInteger(0, 25);

    mockAPI
      .onGet(`${APIRoute.Films}/${filmId}/similar`)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(filmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch load comments when GET /comments/{filmId}', async () => {
    const mockComments = Array.from({length: 3}, () => makeFakeComment());
    const filmId = generateRandomInteger(0, 25);

    mockAPI
      .onGet(`${APIRoute.Comments}/${filmId}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(filmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch add comment to film and redirect to film-page when POST /comments/{filmId}', async () => {
    const mockComment = makeFakeComment();
    const filmId = generateRandomInteger(0, 25);
    const mockCommentData = makeFakeCommentData();

    mockAPI
      .onPost(`${APIRoute.Comments}/${filmId}`)
      .reply(200, mockComment);

    const store = mockStore();

    await store.dispatch(addCommentAction([mockCommentData, filmId]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCommentAction.pending.type,
      redirectToRoute.type,
      addCommentAction.fulfilled.type,

    ]);
  });

  it('should set authorization status «AUTH» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const mockUser: AuthData = {email: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

});
