import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import {AppScreenProps} from '../../types/types';

function App({promoFilm, films}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main} element={<MainScreen promoFilm={promoFilm} films={films}/>}
        />
        <Route path={AppRoute.Film}>
          <Route index element={<MoviePageScreen />} />
          <Route path=':id' element={<MoviePageScreen />} />
          <Route path=':id/review' element={<AddReviewScreen />} />
        </Route>
        <Route
          path={AppRoute.MyList} element={<MyListScreen />}
        />
        <Route path={AppRoute.Player}>
          <Route index element={<PlayerScreen />} />
          <Route path=':id' element={<PlayerScreen />} />
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
