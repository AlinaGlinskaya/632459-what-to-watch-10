import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import MainScreen from './main-screen';
import {makeFakeFilm} from '../../utils/mock';
import {AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {setFilters} from '../../utils';

const mockFilms = Array.from({length: 4}, () => makeFakeFilm());

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const filters = setFilters(mockFilms);

const store = mockStore({
  FAVORITE: {favoriteFilms: []},
  FILM: {films: mockFilms},
  FILTER: {filters: filters},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth}
});

describe('Component: Main Screen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>);
  });
});
