import {render} from '@testing-library/react';
import Comment from './comment';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import {makeFakeComment, makeFakeFilm} from '../../utils/mock';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockComment = makeFakeComment();
const mockFilm = makeFakeFilm();

const history = createMemoryHistory();
history.push(`${AppRoute.Films}/${mockFilm.id}`);

const store = mockStore({
  COMMENT: {comment: mockComment},
});

describe('Component: Comment', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Comment comment={mockComment} />
        </HistoryRouter>
      </Provider>
    );
  });
});
