import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {createAPI} from '../../services/api';
import HistoryRouter from '../history-route/history-route';
import AddReviewForm from './add-review-form';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeFakeComment, makeFakeFilm, makeFakeUser} from '../../utils/mock';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockFilm = makeFakeFilm();
const mockComments = Array.from({length: 2}, () => makeFakeComment());
const mockString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
const mockRating = '5';
const mockUser = makeFakeUser();

const store = mockStore({
  FILM: {film: mockFilm},
  COMMENT: {comments: mockComments, isPosting: false},
  USER: {user: mockUser, authorizationStatus: AuthorizationStatus.Auth}
});


describe('Component: Add Review Form', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Films}/${mockFilm.id}${AppRoute.AddReview}`);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <AddReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Rating/i)[0]).toBeInTheDocument();
  });

  it('should update form when user fulfiiled form', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <AddReviewForm />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Review text/i), mockString);
    await userEvent.type(screen.getAllByLabelText(/Rating/i)[0], mockRating);

    expect(screen.getByDisplayValue(`${mockString}`)).toBeInTheDocument();
    expect(screen.getByDisplayValue(`${mockRating}`)).toBeInTheDocument();
  });
});
