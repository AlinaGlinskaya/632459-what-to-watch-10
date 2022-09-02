import {render, screen} from '@testing-library/react';
import Promo from './promo';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeFakeFilm} from '../../utils/mock';
import {Route, Routes} from 'react-router-dom';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockFilm = makeFakeFilm();
const mockFavoriteFilms = Array.from({length: 2}, () => makeFakeFilm());

const history = createMemoryHistory();
history.push(AppRoute.Main);

const store = mockStore({
  FILM: {promoFilm: mockFilm},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  FAVORITE: {favoriteFilms: mockFavoriteFilms}
});

describe('Component: Promo', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Promo />
        </HistoryRouter>
      </Provider>
    );
  });

  it('should redirect to /player/id when user clicked to play button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<Promo />}
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
});
