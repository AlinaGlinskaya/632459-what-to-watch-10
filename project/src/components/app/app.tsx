import MainScreen from '../../pages/main-screen/main-screen';
import {AppScreenProps} from '../../types/types';

function App(props: AppScreenProps): JSX.Element {
  return (
    <MainScreen promoFilm={props.promoFilm} films={props.films}/>);
}

export default App;
