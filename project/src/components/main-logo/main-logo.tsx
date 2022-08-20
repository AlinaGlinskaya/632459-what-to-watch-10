import {NavLink} from 'react-router-dom';
import {AppRoute} from '../../const';

function MainLogo(): JSX.Element {
  return (
    <div className="logo">
      <NavLink to={AppRoute.Main} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </NavLink>
    </div>
  );
}

export default MainLogo;
