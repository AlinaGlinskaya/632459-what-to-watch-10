import {render} from '@testing-library/react';
import FilmsList from './films-list';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeFilm} from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';

const mockFilms = Array.from({length: 4}, () => makeFakeFilm());

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();
history.push(AppRoute.Films);
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

const store = mockStore({
  FILM: {films: mockFilms},
});

describe('Component: Films List', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmsList films={mockFilms} />
        </HistoryRouter>
      </Provider>
    );
  });
});
