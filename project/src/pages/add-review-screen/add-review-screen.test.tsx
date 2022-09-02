import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeComment, makeFakeFilm, makeFakeUser} from '../../utils/mock';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {AppRoute, AuthorizationStatus} from '../../const';
import AddReviewScreen from './add-review-screen';

const mockFilm = makeFakeFilm();
const mockUser = makeFakeUser();
const mockComments = Array.from({length: 2}, () => makeFakeComment);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  FILM: {film: mockFilm},
  USER: {user: mockUser, authorizationStatus: AuthorizationStatus.Auth},
  COMMENT: {comments: mockComments}
});

describe('Component: Add Review Screen', () => {

  beforeAll(() => {
    history.push(`${AppRoute.Films}/${mockFilm.id}${AppRoute.AddReview}`);
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewScreen />
        </HistoryRouter>
      </Provider>);
  });

  it('should redirect to /films/id when user clicked to film link', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Films}/${mockFilm.id}${AppRoute.AddReview}`}
              element={<AddReviewScreen />}
            />
            <Route
              path={`${AppRoute.Films}/${mockFilm.id}`}
              element={<h1>This is Movie Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);


    expect(screen.queryByText(/This is Movie Page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('link'));

    expect(screen.getByText(/This is Movie Page/i)).toBeInTheDocument();
  });
});
