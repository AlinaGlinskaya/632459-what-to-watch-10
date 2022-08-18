import {AuthorizationStatus} from '../../const';
import {UserBlockProps} from '../../types/types';
import {useAppSelector} from '../../hooks';
import {MouseEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

function UserBlockAuth({avatarUrl}: UserBlockProps): JSX.Element | null {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  const handleLinkLogoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (authorizationStatus === AuthorizationStatus.Auth)
    ?
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a href="/#" onClick={handleLinkLogoutClick} className="user-block__link">Sign out</a>
      </li>
    </ul>
    : null;
}

export default UserBlockAuth;