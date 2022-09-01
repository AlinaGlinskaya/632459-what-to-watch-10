import {fireEvent, render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import PlayerScreen from './player-screen';
import MainScreen from '../main-screen/main-screen';
import {AppRoute} from '../../const';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import { makeFakeFilm } from '../../utils/mock';
import { AuthorizationStatus } from '../../const';

const mockFilms = Array.from({length: 25}, () => makeFakeFilm());
const mockFavoriteFilms = Array.from({length: 5}, () => makeFakeFilm());

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  FAVORITE: {favoriteFilms: mockFavoriteFilms},
  FILM: {films: mockFilms},
  FILTER: {filters: []},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth}
});

describe('Component: PLayer Screen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main} element={<MainScreen />}
            />
            <Route path={AppRoute.Player}>
              <Route path=":id" element={<PlayerScreen />} />
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>);
  });
});
