import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import userEvent from '@testing-library/user-event';
import FooterLogo from './footer-logo';

const history = createMemoryHistory();

describe('Component: Main Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FooterLogo />
      </HistoryRouter>);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<FooterLogo />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
