import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {makeFakeFilm} from '../../utils/mock';
import Filters from './filters';
import {FILTER_DEFAULT} from '../../const';
import {FILMS_PER_STEP} from '../../store/filter-process/filter-process';
import {setFilters} from '../../utils';

const mockFilm = makeFakeFilm();
const mockFilms = Array.from({length: 8}, () => makeFakeFilm());
const filters = setFilters(mockFilms);
const mockStore = configureMockStore();

const store = mockStore({
  FILM: {films: mockFilms, film: mockFilm},
  FILTER: {activeFilter: FILTER_DEFAULT, renderedFilmCount: FILMS_PER_STEP, filters: filters},
});

describe('Component: Filters', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });
});
