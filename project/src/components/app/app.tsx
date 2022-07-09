import MainScreen from '../../pages/main-screen/main-screen';

function App(): JSX.Element {
  return (
    <MainScreen img="img/the-grand-budapest-hotel-poster.jpg"
      alt="The Grand Budapest Hotel poster"
      title="The Grand Budapest Hotel"
      genre="Drama"
      year={2014}
    />);
}

export default App;
