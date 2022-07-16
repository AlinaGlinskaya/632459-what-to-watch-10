import {AppRoute, AuthorizationStatus} from '../../const';
import {PrivateRouteProps} from '../../types/types';
import {Navigate} from 'react-router-dom';

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
