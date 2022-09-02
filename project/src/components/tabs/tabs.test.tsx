import {render, screen} from '@testing-library/react';
import Tabs from './tabs';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import {makeFakeComment, makeFakeFilm} from '../../utils/mock';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockFilm = makeFakeFilm();
const mockComments = Array.from({length: 2}, () => makeFakeComment());

const history = createMemoryHistory();
history.push(AppRoute.Main);

const store = mockStore({
  FILM: {film: mockFilm},
  COMMENT: {comments: mockComments}
});

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByTestId('overview')).toHaveClass('film-nav__item--active');
  });

  it('should render details content when user click on details tab', async () => {
    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Details/i));

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toHaveClass('film-nav__item--active');
  });

  it('should render reviews content when user click on reviews tab', async () => {
    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Reviews/i));

    expect(screen.getByTestId('reviews')).toHaveClass('film-nav__item--active');
  });
});
