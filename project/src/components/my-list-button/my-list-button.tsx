import {useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/favorite-process/selectors';
import {setFavoriteFilmAction} from '../../store/api-actions';
import {useDispatch} from 'react-redux';
import {FilmCardProps, TypedDispatch} from '../../types/types';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AuthorizationStatus, AppRoute} from '../../const';
import {useNavigate} from 'react-router-dom';

function MyListButton({film}: FilmCardProps): JSX.Element {
  const dispatch = useDispatch<TypedDispatch>();
  const navigate = useNavigate();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const favoriteData = {
    filmId: film?.id,
    status: film?.isFavorite ? 0 : 1
  };

  const handleFavoriteButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.SignIn);
    }
    dispatch(setFavoriteFilmAction(favoriteData));
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteButtonClick}>
      {!film?.isFavorite &&
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>}
      {film?.isFavorite &&
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>}
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms === null ? 0 : favoriteFilms.length}</span>
    </button>
  );
}

export default MyListButton;
