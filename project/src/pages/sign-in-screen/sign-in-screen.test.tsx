import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import SignInScreen from './sign-in-screen';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();

describe('Component: SignInScreen', () => {
  it('should render "SIgnInScreen" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push(AppRoute.SignIn);

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SignInScreen />
        </HistoryRouter>
      </Provider>,
    );

    const headerElement = screen.getAllByText(/Sign in/i)[0];

    expect(headerElement).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123q');

    expect(screen.getByDisplayValue(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123q/i)).toBeInTheDocument();
  });
});
