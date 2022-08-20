import MainLogo from '../../components/main-logo/main-logo';
import FooterLogo from '../../components/footer-logo/footer-logo';
import {FilmsMainProps} from '../../types/types';
import MyList from '../../components/my-list/my-list';
import UserBlockAuth from '../../components/user-block-auth/user-block-auth';
import {useAppSelector} from '../../hooks';

function MyListScreen({films}: FilmsMainProps): JSX.Element {

  const {userData} = useAppSelector((state) => state);

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <MainLogo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserBlockAuth avatarUrl={userData?.avatarUrl} />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MyList films={films} ></MyList>
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
