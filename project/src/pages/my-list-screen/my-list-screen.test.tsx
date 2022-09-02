import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeFilm, makeFakeUser} from '../../utils/mock';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {AppRoute, AuthorizationStatus} from '../../const';
import MyListScreen from './my-list-screen';

const mockFilm = makeFakeFilm();
const mockUser = makeFakeUser();
const mockFavoriteFilms = Array.from({length: 4}, () => makeFakeFilm());
const mockFavoriteLength = mockFavoriteFilms.length;

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  FILM: {film: mockFilm},
  USER: {user: mockUser, authorizationStatus: AuthorizationStatus.Auth},
  FAVORITE: {favoriteFilms: mockFavoriteFilms}
});

describe('Component: My List Screen', () => {

  beforeAll(() => {
    history.push(AppRoute.MyList);
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListScreen />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(`${mockFavoriteLength}`)).toBeInTheDocument();
  });
});
