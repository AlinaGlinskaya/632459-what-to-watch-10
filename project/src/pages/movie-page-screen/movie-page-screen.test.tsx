import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeFilm, makeFakeUser} from '../../utils/mock';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {AppRoute, AuthorizationStatus} from '../../const';
import MoviePageScreen from './movie-page-screen';

const mockFilm = makeFakeFilm();
const mockUser = makeFakeUser();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const storeNoAuth = mockStore({
  FILM: {film: mockFilm},
  USER: {user: mockUser, authorizationStatus: AuthorizationStatus.NoAuth},
  FAVORITE: {favoriteFilms: []}
});

describe('Component: Movie Page Screen', () => {

  beforeAll(() => {
    history.push(`${AppRoute.Films}/${mockFilm.id}`);
  });
  it('should render correctly', () => {
    render(
      <Provider store={storeNoAuth}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>);
  });

  it('should redirect to /player/id when user clicked to play button', async () => {
    render(
      <Provider store={storeNoAuth}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Films}/${mockFilm.id}`}
              element={<MoviePageScreen />}
            />
            <Route
              path={`${AppRoute.Player}${mockFilm.id}`}
              element={<h1>This is Player</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);


    expect(screen.queryByText(/This is Player/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Play'));

    expect(screen.getByText(/This is Player/i)).toBeInTheDocument();
  });

  it('should not render "Add review" link when user is not authorized', async () => {
    render(
      <Provider store={storeNoAuth}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>);


    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
  });
});
