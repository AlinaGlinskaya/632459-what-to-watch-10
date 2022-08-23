import MainLogo from '../../components/main-logo/main-logo';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import FooterLogo from '../../components/footer-logo/footer-logo';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <MainLogo />
      </header>

      <div className="not-found">
        <div className="not-found__content">
          <h1><b>404.</b><br /><small>Page not found</small></h1>
          <Link to={AppRoute.Main}>Return to main page</Link>
        </div>
      </div>

      <footer className="page-footer">
        <FooterLogo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default NotFoundScreen;
