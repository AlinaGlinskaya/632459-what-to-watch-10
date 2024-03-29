import {MouseEvent} from 'react';
import {useState} from 'react';
import Details from '../details/details';
import Overview from '../overview/overview';
import Reviews from '../reviews/reviews';
import {TabName} from '../../const';
import {useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getFilm} from '../../store/film-process/selectors';

function Tabs(): JSX.Element {
  const [activeTab, setActiveTab] = useState('overview');
  const film = useAppSelector(getFilm);
  const params = useParams();
  const filmId = Number(params?.id);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setActiveTab(TabName.Overview);
    }
    return () => {
      isMounted = false;
    };

  }, [filmId]);

  const handleTabClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (evt.currentTarget !== null) {
      setActiveTab(evt.currentTarget.id);
    }
  };

  const setTabContent = () => {
    switch(activeTab) {
      case TabName.Overview:
        return <Overview film={film} />;
      case TabName.Details:
        return <Details film={film} />;
      case TabName.Reviews:
        return <Reviews />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li data-testid="overview" className={`film-nav__item ${activeTab === TabName.Overview ? 'film-nav__item--active' : ''}`}>
            <a href="/#" id={'overview'} onClick={handleTabClick} className="film-nav__link">Overview</a>
          </li>
          <li data-testid="details" className={`film-nav__item ${activeTab === TabName.Details ? 'film-nav__item--active' : ''}`}>
            <a href="/#" id={'details'} onClick={handleTabClick} className="film-nav__link">Details</a>
          </li>
          <li data-testid="reviews" className={`film-nav__item ${activeTab === TabName.Reviews ? 'film-nav__item--active' : ''}`}>
            <a href="/#" id={'reviews'} onClick={handleTabClick} className="film-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
      {setTabContent()}
    </div>


  );
}

export default Tabs;
