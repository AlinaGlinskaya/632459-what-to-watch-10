import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import PlayerScreen from './player-screen';
import {AppRoute} from '../../const';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeFilm} from '../../utils/mock';
import {AuthorizationStatus} from '../../const';

const mockFilm = makeFakeFilm();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  FAVORITE: {favoriteFilms: []},
  FILM: {film: mockFilm},
  FILTER: {filters: []},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth}
});

describe('Component: PLayer Screen', () => {

  beforeAll(() => {
    history.push(`${AppRoute.Player}${mockFilm.id}`);
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlayerScreen />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('exit')).toBeInTheDocument();
    expect(screen.getByTestId('player-btn')).toBeInTheDocument();
    expect(screen.getByTestId('fullscreen-btn')).toBeInTheDocument();
  });

  it('should redirect to /films/id when user clicked to exit button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Player}${mockFilm.id}`}
              element={<PlayerScreen />}
            />
            <Route
              path={`${AppRoute.Films}/${mockFilm.id}`}
              element={<h1>This is Film</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);


    expect(screen.queryByText(/This is Film/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('exit'));

    expect(screen.getByText(/This is Film/i)).toBeInTheDocument();
  });
});
