import {render, screen} from '@testing-library/react';
import MyListButton from './my-list-button';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeFakeFilm, makeFakeUser} from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFilms = Array.from({length: 6}, () => makeFakeFilm());
const mockFavoriteFilms = Array.from({length: 4}, () => makeFakeFilm());
const mockFilm = makeFakeFilm();
const mockUser = makeFakeUser();
const mockFavoriteLength = mockFavoriteFilms.length;

const history = createMemoryHistory();
history.push(`${AppRoute.Films}/${mockFilm.id}`);

const store = mockStore({
  FILM: {films: mockFilms, film: mockFilm},
  FAVORITE: {favoriteFilms: mockFavoriteFilms},
  USER: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}
});

describe('Component: MyList Button', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(`${mockFavoriteLength}`)).toBeInTheDocument();
  });
});
