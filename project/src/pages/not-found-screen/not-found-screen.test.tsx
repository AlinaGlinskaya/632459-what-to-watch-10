import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeUser} from '../../utils/mock';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {AuthorizationStatus} from '../../const';
import NotFoundScreen from './not-found-screen';


const mockUser = makeFakeUser();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  USER: {user: mockUser, authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: Not Found Screen', () => {

  beforeAll(() => {
    history.push('/non-existent-route');
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to main page/i)).toBeInTheDocument();
  });
});
