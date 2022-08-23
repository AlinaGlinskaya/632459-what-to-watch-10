import MainLogo from '../../components/main-logo/main-logo';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useAppSelector} from '../../hooks';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import UserBlockAuth from '../../components/user-block-auth/user-block-auth';
import {getFilm} from '../../store/film-process/selectors';
import {getuserData} from '../../store/user-process/selectors';

function AddReviewScreen(): JSX.Element {
  const film = useAppSelector(getFilm);
  const userData = useAppSelector(getuserData);

  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }
  return(
    <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <MainLogo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a href="/#" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlockAuth avatarUrl={userData?.avatarUrl} />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm />
      </div>

    </section>
  );
}

export default AddReviewScreen;
