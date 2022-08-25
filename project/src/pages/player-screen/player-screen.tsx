import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-process/selectors';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import {useRef} from 'react';
import './player-screen.css';

function PlayerScreen(): JSX.Element {
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const videoElement = useRef(null);

  const {
    playerState,
    handlePlayButtonClick,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleFullScreenButtonClick
  } = useVideoPlayer(videoElement);
  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }

  return(
    <div className="player">
      <video src={film.videoLink} ref={videoElement} className="player__video" onTimeUpdate={handleOnTimeUpdate} poster={film.backgroundImage}></video>

      <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time range-container">
            <input className="player__range" type="range" value={playerState.progress} min="0" max="100" onChange={(e) => handleVideoProgress(e)}></input>
            <progress className="player__progress" value={playerState.progress} max="100"></progress>
          </div>
          <div className="player__time-value">{playerState.duration}</div>
        </div>

        <div className="player__controls-row">
          {playerState.isPlaying ?
            (
              <button onClick={handlePlayButtonClick} type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
            ) :
            (
              <button onClick={handlePlayButtonClick} type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
            )}
          <div className="player__name">{film.name}</div>

          <button onClick={handleFullScreenButtonClick} type="button" className="player__full-screen">
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

