import {render, screen} from '@testing-library/react';
import UserBlockAnonim from './user-block-anonim';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus, FILTER_DEFAULT} from '../../const';
import {makeFakeFilm} from '../../utils/mock';
import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFilms = Array.from({length: 4}, () => makeFakeFilm());
const mockFavoriteFilms = Array.from({length: 2}, () => makeFakeFilm());

const history = createMemoryHistory();
history.push(AppRoute.Main);

const store = mockStore({
  FILM: {films: mockFilms},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  FAVORITE: {favoriteFilms: mockFavoriteFilms},
  FILTER: {activeFilter: FILTER_DEFAULT, filters: []}
});

describe('Component: User Block Anonim', () => {

  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlockAnonim />
        </HistoryRouter>
      </Provider>
    );
  });

  it('should redirect to Sign In when user clicked to link', async () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<MainScreen />}
            />
            <Route
              path={AppRoute.SignIn}
              element={<h1>This is Sign In page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/This is Sign In page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText(/This is Sign In page/i)).toBeInTheDocument();
  });
});
