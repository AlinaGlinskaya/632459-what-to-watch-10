import React from 'react';
import MainLogo from '../../components/main-logo/main-logo';
import FooterLogo from '../../components/footer-logo/footer-logo';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useParams} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {FilmsMainProps } from '../../types/types';
import FilmsList from '../../components/films-list/films-list';
import {filmsMore} from '../../mocks/films-more';
import {useNavigate} from 'react-router-dom';
import FilmTabs from '../../components/tabs/tabs';

function MoviePageScreen({films}: FilmsMainProps): JSX.Element {
  const navigate = useNavigate();
  const params = useParams().id;
  const filmId = Number(params?.split('=')[1]);
  const film = films.find((item) => item.id === filmId);
  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }

  return(
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <MainLogo />

            <div className="user-block">
              <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
            </div>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/:id=${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={() => navigate(AppRoute.MyList)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <FilmTabs film={film}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={filmsMore}></FilmsList>
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
