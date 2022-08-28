import React from 'react';
import MainLogo from '../../components/main-logo/main-logo';
import FooterLogo from '../../components/footer-logo/footer-logo';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useParams} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useNavigate} from 'react-router-dom';
import Tabs from '../../components/tabs/tabs';
import SimilarFilmsList from '../../components/similar-films-list/similar-films-list';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks';
import UserBlockAnonim from '../../components/user-block-anonim/user-block-anonim';
import UserBlockAuth from '../../components/user-block-auth/user-block-auth';
import {getFilm, getSimilarFilms} from '../../store/film-process/selectors';
import {getAuthorizationStatus, getuserData} from '../../store/user-process/selectors';
import MyListButton from '../../components/my-list-button/my-list-button';

function MoviePageScreen(): JSX.Element {
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const userData = useAppSelector(getuserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const filmId = Number(params?.id);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilmAction(filmId));
      dispatch(fetchSimilarFilmsAction(filmId));
    }

    return () => {
      isMounted = false;
    };

  }, [filmId, dispatch]);

  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }

  return(
    <React.Fragment>
      <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <MainLogo />

            <UserBlockAnonim />
            <UserBlockAuth avatarUrl={userData?.avatarUrl} />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton film={film} />
                {authorizationStatus === AuthorizationStatus.Auth
                &&
                <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            {<Tabs />}

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <SimilarFilmsList films={similarFilms}></SimilarFilmsList>
        </section>

        <footer className="page-footer">
          <FooterLogo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default MoviePageScreen;
