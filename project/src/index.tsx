import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {films} from './mocks/films';
import {film} from './mocks/promo-film';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App promoFilm={film} films={films} />
    </Provider>
  </React.StrictMode>,
);
