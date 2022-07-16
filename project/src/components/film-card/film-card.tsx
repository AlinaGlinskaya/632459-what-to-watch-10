import {FilmCardProps} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function FilmCard({img, title}: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={img} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film} className="small-film-card__link">{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
