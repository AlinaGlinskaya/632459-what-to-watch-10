import React from 'react';
import FilmsList from '../../components/films-list/films-list';
import MainLogo from '../../components/main-logo/main-logo';
import UserBlockAnonim from '../../components/user-block-anonim/user-block-anonim';
import UserBlockAuth from '../../components/user-block-auth/user-block-auth';
import FooterLogo from '../../components/footer-logo/footer-logo';
import {AppRoute} from '../../const';
import {useNavigate} from 'react-router-dom';
import Filters from '../../components/filters/filters';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import {useAppSelector } from '../../hooks';
import {useEffect} from 'react';
import { resetFilters } from '../../store/filter-process/filter-process';
import {useAppDispatch} from '../../hooks';
import {getPromoFilm} from '../../store/film-process/selectors';
import {getRenderedFilmsCount} from '../../store/filter-process/selectors';
import {getuserData} from '../../store/user-process/selectors';
import { getFilteredFilms } from '../../store/filter-process/selectors';

function MainScreen(): JSX.Element {
  const filteredFilms = useAppSelector(getFilteredFilms);
  const renderedFilmsCount = useAppSelector(getRenderedFilmsCount);
  const promoFilm = useAppSelector(getPromoFilm);
  const userData = useAppSelector(getuserData);
  const filmsToRender = filteredFilms.slice(0, renderedFilmsCount);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <React.Fragment>
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
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/:id=${promoFilm?.id}`)}>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Filters></Filters>

          <FilmsList films={filmsToRender}></FilmsList>

          <ShowMoreButton films={filmsToRender} count={renderedFilmsCount}></ShowMoreButton>

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

export default MainScreen;
