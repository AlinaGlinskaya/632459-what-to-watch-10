import {render} from '@testing-library/react';
import FilmsWithFilters from './films-with-filters';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeFilm} from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AppRoute, FILTER_DEFAULT} from '../../const';
import { setFilters } from '../../utils';
import { FILMS_PER_STEP } from '../../store/filter-process/filter-process';

const mockFilms = Array.from({length: 4}, () => makeFakeFilm());
const mockFilteredFilms = Array.from({length: 3}, () => makeFakeFilm());
const filters = setFilters(mockFilms);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();
history.push(AppRoute.Films);
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

const store = mockStore({
  FILM: {films: mockFilms, filteredFilms: mockFilteredFilms, renderedFilmsCount: FILMS_PER_STEP},
  FILTER: {activeFilter: FILTER_DEFAULT, filters: filters}
});

describe('Component: Films With Filters', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmsWithFilters />
        </HistoryRouter>
      </Provider>
    );
  });
});
