import {AppRoute, AuthorizationStatus} from '../../const';
import {PrivateRouteProps} from '../../types/types';
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
