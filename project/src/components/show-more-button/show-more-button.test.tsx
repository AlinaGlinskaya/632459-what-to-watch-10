import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {makeFakeFilm} from '../../utils/mock';
import ShowMoreButton from './show-more-button';
import {FILTER_DEFAULT} from '../../const';

const FILMS_PER_STEP = 8;

const mockFilms = Array.from({length: 12}, () => makeFakeFilm());
const mockStore = configureMockStore();
const store = mockStore({
  FILTER: {activeFilter: FILTER_DEFAULT, renderedFilmsCount: FILMS_PER_STEP},
});

describe('Component: Show more button', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <ShowMoreButton films={mockFilms} count={FILMS_PER_STEP} />
      </Provider>
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should render films when user click on show more button', async () => {

    render(
      <Provider store={store}>
        <ShowMoreButton films={mockFilms} count={FILMS_PER_STEP} />
      </Provider>
    );

    const buttonElement = screen.getByText('Show more');
    await userEvent.click(buttonElement);
    const actions = store.getActions();
    expect(actions[0].type).toBe('FILTER/renderMoreFilms');
  });

  it('should show more button not rendered if no more films or films count less then limit', () => {

    render(
      <Provider store={store}>
        <ShowMoreButton films={mockFilms.slice(0,2)} count={3} />
      </Provider>
    );

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });
});
