import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import MainScreen from './main-screen';
import {makeFakeFilm} from '../../utils/mock';
import {AppRoute, AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import { setFilters } from '../../utils';

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

describe('Component: Main Screen', () => {

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>);
  });
});
