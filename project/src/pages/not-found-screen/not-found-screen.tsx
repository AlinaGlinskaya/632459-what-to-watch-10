import MainLogo from '../../components/main-logo/main-logo';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import FooterLogo from '../../components/footer-logo/footer-logo';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <MainLogo />
      </header>

      <div className="sign-in user-page__content" style={{display: 'flex', alignItems: 'center'}}>
        <div style={{margin: '0 auto'}}>
          <h1><b>404.</b><br /><small style={{marginTop: '30px', display: 'block'}}>Page not found</small></h1>
          <Link to={AppRoute.Main} style={{color: '#d9cd8d'}}>Return to main page</Link>
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
