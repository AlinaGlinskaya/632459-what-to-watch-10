import {FilmCardProps} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function FilmCard({id, img, title, onMouseEnter, onMouseLeave}: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        <img src={img} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`${AppRoute.Films}/:id=${id}`} className="small-film-card__link">{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
