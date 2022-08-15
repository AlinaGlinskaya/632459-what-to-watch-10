import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {film} from './mocks/promo-film';
import ErrorMessage from './components/error-message/error-message';
import {fetchFilmsAction} from './store/api-actions';

store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App promoFilm={film} />
    </Provider>
  </React.StrictMode>,
);
