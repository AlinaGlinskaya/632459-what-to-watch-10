import React from 'react';
import {FilmMain} from '../../types/types';

function Overview(film: FilmMain): JSX.Element {
  const actors = film.starring.map((item) => item).join(', ');
  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">240 ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {actors}</strong></p>
      </div>
    </React.Fragment>
  );
}

export default Overview;
