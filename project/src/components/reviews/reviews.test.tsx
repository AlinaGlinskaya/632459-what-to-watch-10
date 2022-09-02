import {render} from '@testing-library/react';
import Reviews from './reviews';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeComment, makeFakeFilm} from '../../utils/mock';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockComments = Array.from({length: 3}, () => makeFakeComment());
const mockFilm = makeFakeFilm();
const store = mockStore({
  COMMENT: {comments: mockComments},
  FILM: {film: mockFilm}
});

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );
  });
});
