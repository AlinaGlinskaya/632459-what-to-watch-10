import {AuthorizationStatus, AppRoute} from '../../const';
import {UserBlockProps} from '../../types/types';
import {useAppSelector} from '../../hooks';
import {MouseEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {useNavigate} from 'react-router-dom';

function UserBlockAuth({avatarUrl}: UserBlockProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLinkLogoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (authorizationStatus === AuthorizationStatus.Auth)
    ?
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" data-testid="link-mylist" onClick={() => navigate(AppRoute.MyList)}>
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
