import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {useAppSelector} from '../../hooks';
import Spinner from '../../pages/spinner/spinner';
import {getIsDataLoading, getIsServerAvailable} from '../../store/film-process/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import ServerError from '../server-error/server-error';

function App(): JSX.Element {
  const isDataLoading = useAppSelector(getIsDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isServerAvailable = useAppSelector(getIsServerAvailable);

  if (isDataLoading) {
    return <Spinner />;
  }

  if (!isServerAvailable) {
    return <ServerError />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main} element={<MainScreen />}
        />
        <Route path={AppRoute.Films}>
          <Route path=":id" element={<MoviePageScreen />} />
          <Route path=":id/review" element={<PrivateRoute authorizationStatus={authorizationStatus}><AddReviewScreen /></PrivateRoute>} />
        </Route>
        <Route
          path={AppRoute.MyList}
          element={<PrivateRoute authorizationStatus={authorizationStatus}><MyListScreen /></PrivateRoute>}
        />
        <Route path={AppRoute.Player}>
          <Route path=":id" element={<PlayerScreen />} />
        </Route>
        <Route
          path={AppRoute.SignIn} element={<SignInScreen />}
        />
        <Route
          path="*" element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

