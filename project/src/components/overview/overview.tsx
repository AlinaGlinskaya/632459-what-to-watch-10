import React from 'react';
import { FilmLevel } from '../../const';
import {FilmCardProps} from '../../types/types';

function Overview({film}: FilmCardProps): JSX.Element {

  const ACTORS_MAX_LENGTH = 4;

  const getFilmActors = () => {
    if (film?.starring && film?.starring.length <= ACTORS_MAX_LENGTH) {
      return film?.starring.map((item) => item).join(', ');
    }
    const actors = film?.starring.slice(0, ACTORS_MAX_LENGTH)
      .map((item) => item).join(', ');
    return `${actors} and others`;
  };

  const getFilmLevel = () => {
    if (film?.rating) {
      const filmRate = Math.floor(film?.rating);

      if (filmRate < FilmLevel.Bad) {
        return 'Bad';
      }
      if (filmRate >= FilmLevel.Bad && filmRate < FilmLevel.Normal) {
        return 'Normal';
      }
      if (filmRate >= FilmLevel.Normal && filmRate < FilmLevel.Good) {
        return 'Good';
      }
      if (filmRate >= FilmLevel.Good && filmRate < FilmLevel.Awesome) {
        return 'Very good';
      }

      return 'Awesome';
    }
  };

  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getFilmLevel()}</span>
          <span className="film-rating__count">240 ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>

        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {getFilmActors()}</strong></p>
      </div>
    </React.Fragment>
  );
}

export default Overview;
