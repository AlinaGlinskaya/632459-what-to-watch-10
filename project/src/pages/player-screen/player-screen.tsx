import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-process/selectors';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import {useRef} from 'react';

function PlayerScreen(): JSX.Element {
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlaying
  } = useVideoPlayer(videoElement);
  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }

  return(
    <div className="player">
      <video src={film.videoLink} ref={videoElement} className="player__video" poster={film.backgroundImage}></video>

      <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          {playerState.isPlaying ?
            (
              <button onClick={togglePlaying} type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
            ) :
            (
              <button onClick={togglePlaying} type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
            )}
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;

