import {makeFakeFilm} from '../../utils/mock';
import {render, screen} from '@testing-library/react';
import Overview from './overview';

const film = makeFakeFilm();

describe('Component: Overview', () => {
  it('should render correctly', () => {
    render(
      <Overview film={film} />
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
  });
});
