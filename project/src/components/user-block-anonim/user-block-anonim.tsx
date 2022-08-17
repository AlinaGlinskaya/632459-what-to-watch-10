import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';

function UserBlockAnonim(): JSX.Element |null {
  const {authorizationStatus} = useAppSelector((state) => state);

  return (authorizationStatus !== AuthorizationStatus.Auth)
    ?
    <div className="user-block">
      <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
    : null;
}

export default UserBlockAnonim;
