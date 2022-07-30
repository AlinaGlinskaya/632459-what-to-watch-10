import MainLogo from '../../components/main-logo/main-logo';
import FooterLogo from '../../components/footer-logo/footer-logo';
import FilmCard from '../../components/film-card/film-card';
import {useState} from 'react';
import {FilmsMainProps} from '../../types/types';

function MyListScreen({films}: FilmsMainProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | null>();
  const items = films.map((item) => (
    <FilmCard
      id={item.id}
      isActive={activeFilmId === item.id}
      onMouseEnter={() => setActiveFilmId(item.id)}
      onMouseLeave={() => setActiveFilmId(null)}
      title={item.name}
      img={item.previewImage}
      key={item.id}
      previewVideoLink={item.previewVideoLink}
      posterImage={item.posterImage}
    />));
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <MainLogo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a href="/#" className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {items}
        </div>
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
