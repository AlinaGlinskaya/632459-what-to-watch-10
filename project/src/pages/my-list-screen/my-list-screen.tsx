import MainLogo from '../../components/main-logo/main-logo';
import FooterLogo from '../../components/footer-logo/footer-logo';
import MyList from '../../components/my-list/my-list';
import UserBlockAuth from '../../components/user-block-auth/user-block-auth';
import {useAppSelector} from '../../hooks';
import {getuserData} from '../../store/user-process/selectors';
import {getFavoriteFilms} from '../../store/favorite-process/selectors';
import {fetchFavoriteFilmsAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks';

function MyListScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  const userData = useAppSelector(getuserData);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <MainLogo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms === null ? '0' : favoriteFilms.length}</span></h1>
        <UserBlockAuth avatarUrl={userData?.avatarUrl} />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MyList ></MyList>
      </section>

      <footer className="page-footer">
        <FooterLogo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
