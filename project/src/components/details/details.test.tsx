import {makeFakeFilm} from '../../utils/mock';
import {render, screen} from '@testing-library/react';
import Details from './details';

const film = makeFakeFilm();

describe('Component: Details', () => {
  it('should render correctly', () => {
    render(
      <Details film={film} />
    );

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
  });
});
