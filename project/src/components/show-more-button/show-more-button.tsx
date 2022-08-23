import {ShowMoreButtonProps} from '../../types/types';
import {useAppDispatch} from '../../hooks';
import {renderMoreFilms} from '../../store/filter-process/filter-process';

function ShowMoreButton({films, count}: ShowMoreButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  const handleShowMoreButtonClick = () => {
    dispatch(renderMoreFilms());
  };

  if (films.length < count) {
    return null;
  }
  return (
    <div className="catalog__more">
      <button onClick={handleShowMoreButtonClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMoreButton;
