import Filters from '../filters/filters';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import { useAppSelector } from '../../hooks';
import { getFilteredFilms } from '../../store/filter-process/selectors';
import { getRenderedFilmsCount } from '../../store/filter-process/selectors';

function FilmsWithFilters(): JSX.Element {
  const filteredFilms = useAppSelector(getFilteredFilms);
  const renderedFilmsCount = useAppSelector(getRenderedFilmsCount);
  const filmsToRender = filteredFilms.slice(0, renderedFilmsCount);
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Filters></Filters>
      <FilmsList films={filmsToRender}></FilmsList>
      <ShowMoreButton films={filmsToRender} count={renderedFilmsCount}></ShowMoreButton>

    </section>
  );
}

export default FilmsWithFilters;
