import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute, FILTER_DEFAULT} from '../../const';
import App from './app';
import {makeFakeFilm} from '../../utils/mock';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockFilms = Array.from({length: 4}, () => makeFakeFilm());
const mockFilm = makeFakeFilm();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILM: {isDataLoading: false, film: mockFilm, isServerAvailable: true, films: mockFilms},
  FILTER: {activeFilter: FILTER_DEFAULT},
  FAVORITE: {favoriteFilms: mockFilms}
});

const storeLoadingFilms = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILM: {isDataLoading: true, film: mockFilm, isServerAvailable: true, films: mockFilms},
  FILTER: {activeFilter: FILTER_DEFAULT},
  FAVORITE: {favoriteFilms: mockFilms}
});

const storeServerNotAvailable = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILM: {isDataLoading: false, film: mockFilm, isServerAvailable: false},
  FILTER: {activeFilter: FILTER_DEFAULT},
  FAVORITE: {favoriteFilms: mockFilms}
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
    window.scrollTo = jest.fn();
  });

  it('should render Server Error Component when server is not available', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={storeServerNotAvailable}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Server not available/i)).toBeInTheDocument();
  });

  it('should render "Main Screen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);
  });

  it('should render Spinner Component when films is loading', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={storeLoadingFilms}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Spinner/i)).toBeInTheDocument();
  });

  it('should render "Sign In Screen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    const headerElement = screen.getAllByText(/Sign in/i)[0];

    expect(headerElement).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Movie Page Screen" when user navigate to "/films/id"', () => {
    history.push(`${AppRoute.Films}/${mockFilm.id}`);

    render(fakeApp);
  });

  it('should render "My List" when user navigate to "/favorite"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);
  });

  it('should render "Player Screen" when user navigate to "/player"', () => {
    history.push(`${AppRoute.Player}${mockFilm.id}`);

    render(fakeApp);
  });

  it('should render "Add Review Screen" when user navigate to "/review"', () => {
    history.push(`${AppRoute.Films}/${mockFilm.id}${AppRoute.AddReview}`);

    render(fakeApp);
  });

  it('should render "Not Found Screen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to main page/i)).toBeInTheDocument();
  });
});
