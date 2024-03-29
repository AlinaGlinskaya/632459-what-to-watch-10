import {FilmCardProps} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import VideoPlayer from '../video-player/video-player';
import {useState} from 'react';

function FilmCard({film}: FilmCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  let timeout: NodeJS.Timeout | undefined = undefined;

  return (
    <article className="small-film-card catalog__films-card"
      data-testid='film-card'
      onMouseEnter={() =>
      {
        timeout = setTimeout(() => setIsPlaying(true), 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(timeout);
        setIsPlaying(false);
      }}
    >
      <VideoPlayer
        isPlaying = {isPlaying}
        src={film?.previewVideoLink}
        poster={film?.previewImage}
      />
      <h3 className="small-film-card__title">
        <Link to={`${AppRoute.Films}/${film?.id}`} className="small-film-card__link">{film?.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
