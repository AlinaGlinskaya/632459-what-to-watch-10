import {MouseEvent} from 'react';
import {useState} from 'react';
import {TabsProps} from '../../types/types';
import Details from '../details/details';
import Overview from '../overview/overview';
import Reviews from '../reviews/reviews';
import {TabName} from '../../const';

function FilmTabs({film}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('overview');

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
        return <Reviews film={film} />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={activeTab === TabName.Overview ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <a href="/#" id={'overview'} onClick={handleTabClick} className="film-nav__link">Overview</a>
          </li>
          <li className={activeTab === TabName.Details ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <a href="/#" id={'details'} onClick={handleTabClick} className="film-nav__link">Details</a>
          </li>
          <li className={activeTab === TabName.Reviews ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <a href="/#" id={'reviews'} onClick={handleTabClick} className="film-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
      {setTabContent()}
    </div>


  );
}

export default FilmTabs;
