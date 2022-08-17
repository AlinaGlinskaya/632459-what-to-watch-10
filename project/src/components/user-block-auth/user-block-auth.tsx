import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {UserBlockProps} from '../../types/types';
import { useAppSelector } from '../../hooks';

function UserBlockAuth({avatarUrl}: UserBlockProps): JSX.Element | null {
  const {authorizationStatus} = useAppSelector((state) => state);

  return (authorizationStatus === AuthorizationStatus.Auth)
    ?
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to={AppRoute.SignOut} className="user-block__link">Sign out</Link>
      </li>
    </ul>
    : null;
}

export default UserBlockAuth;
