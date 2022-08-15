import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
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

function App(): JSX.Element {

  const {films, isDataLoaded} = useAppSelector((state) => state);

  if (isDataLoaded) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main} element={<MainScreen />}
        />
        <Route path={AppRoute.Films}>
          <Route path=":id" element={<MoviePageScreen films={films} />} />
          <Route path=":id/review" element={<AddReviewScreen films={films} />} />
        </Route>
        <Route
          path={AppRoute.MyList}
          element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><MyListScreen films={films} /></PrivateRoute>}
        />
        <Route path={AppRoute.Player}>
          <Route path=":id" element={<PlayerScreen films={films} />} />
        </Route>
        <Route
          path={AppRoute.SignIn} element={<SignInScreen />}
        />
        <Route
          path="*" element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
