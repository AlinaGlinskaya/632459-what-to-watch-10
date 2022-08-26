import MainLogo from '../main-logo/main-logo';
import UserBlockAnonim from '../user-block-anonim/user-block-anonim';
import UserBlockAuth from '../user-block-auth/user-block-auth';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getuserData} from '../../store/user-process/selectors';
import {AppRoute} from '../../const';
import {getFavoriteFilms, getPromoFilm} from '../../store/film-process/selectors';
import { useDispatch } from 'react-redux';
import { setFavoriteFilmAction } from '../../store/api-actions';
import { TypedDispatch } from '../../types/types';

function Promo(): JSX.Element {
  const navigate = useNavigate();
  const userData = useAppSelector(getuserData);
  const promoFilm = useAppSelector(getPromoFilm);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useDispatch<TypedDispatch>();

  const favoriteData = {
    filmId: promoFilm?.id,
    status: promoFilm?.isFavorite ? 0 : 1
  };

  const handleFavoriteButtonClick = () => {
    dispatch(setFavoriteFilmAction(favoriteData));
  };

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <MainLogo />
        <UserBlockAnonim />
        <UserBlockAuth avatarUrl={userData?.avatarUrl} />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm?.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm?.genre}</span>
              <span className="film-card__year">{promoFilm?.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}${promoFilm?.id}`)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteButtonClick}>
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
                <span className="film-card__count">{favoriteFilms === null ? '0' : favoriteFilms.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Promo;
