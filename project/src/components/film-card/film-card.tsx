import {FilmCardProps} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import VideoPlayer from '../video-player/video-player';

function FilmCard({id, title, previewVideoLink, posterImage}: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <VideoPlayer
        src={previewVideoLink}
        posterImage={posterImage}
      />
      <h3 className="small-film-card__title">
        <Link to={`${AppRoute.Films}/:id=${id}`} className="small-film-card__link">{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
