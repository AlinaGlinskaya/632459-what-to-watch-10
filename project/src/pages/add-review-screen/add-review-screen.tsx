import MainLogo from '../../components/main-logo/main-logo';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {FilmsMainProps} from '../../types/types';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useParams} from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';

function AddReviewScreen({films}: FilmsMainProps): JSX.Element {
  const params = useParams().id;
  const filmId = Number(params?.split('=')[1]);
  const film = films.find((item) => item.id === filmId);
  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }
  return(
    <section className="film-card film-card--full">
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
                <Link to={`${AppRoute.Films}/:id=${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a href="/#" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          </div>
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
