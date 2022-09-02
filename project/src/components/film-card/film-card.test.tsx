import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus, FILTER_DEFAULT} from '../../const';
import {makeFakeFilm} from '../../utils/mock';
import FilmCard from './film-card';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {FILMS_PER_STEP} from '../../store/filter-process/filter-process';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockFilm = makeFakeFilm();
const mockFilms = Array.from({length: 12}, () => makeFakeFilm());
const mockFavoriteFilms = Array.from({length: 2}, () => makeFakeFilm());
const mockFilteredFilms = Array.from({length: 2}, () => makeFakeFilm());
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  FILM: {film: mockFilm, films: mockFilms},
  FAVORITE: {favoriteFilms: mockFavoriteFilms},
  FILTER: {activeFilter: FILTER_DEFAULT, filteredFilms: mockFilteredFilms, renderedFilmsCount: FILMS_PER_STEP}
});

describe('Component: Film Card', () => {
  beforeEach(() => {
    history.push(AppRoute.Main);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCard film={mockFilm} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('film-card')).toBeInTheDocument();
  });
});
