import {render, screen} from '@testing-library/react';
import UserBlockAuth from './user-block-auth';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus, FILTER_DEFAULT} from '../../const';
import {makeFakeUser, makeFakeFilm} from '../../utils/mock';
import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockUser = makeFakeUser();
const mockFilms = Array.from({length: 4}, () => makeFakeFilm());
const mockFavoriteFilms = Array.from({length: 2}, () => makeFakeFilm());

const history = createMemoryHistory();
history.push(AppRoute.Main);

const store = mockStore({
  FILM: {films: mockFilms},
  USER: {user: mockUser, authorizationStatus: AuthorizationStatus.Auth},
  FAVORITE: {favoriteFilms: mockFavoriteFilms},
  FILTER: {activeFilter: FILTER_DEFAULT, filters: []}
});

describe('Component: User Block Auth', () => {

  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlockAuth />
        </HistoryRouter>
      </Provider>
    );
  });

  it('should redirect to /favorite when user clicked to link', async () => {
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
              path={AppRoute.MyList}
              element={<h1>This is my list page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/This is my list page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('link-mylist'));

    expect(screen.getByText(/This is my list page/i)).toBeInTheDocument();
  });
});
