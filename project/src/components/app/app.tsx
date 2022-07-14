import MainScreen from '../../pages/main-screen/main-screen';
import {AppScreenProps} from '../../types/types';

function App({promoFilm, films}: AppScreenProps): JSX.Element {
  return (
    <MainScreen promoFilm={promoFilm} films={films}/>);
}

export default App;
