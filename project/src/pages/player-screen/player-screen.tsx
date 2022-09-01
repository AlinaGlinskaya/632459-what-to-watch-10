import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useNavigate} from 'react-router-dom';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import {useRef} from 'react';
import './player-screen.css';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch } from '../../hooks';
import {fetchFilmAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {getFilm, getIsFilmLoading} from '../../store/film-process/selectors';
import Spinner from '../spinner/spinner';
import { AppRoute } from '../../const';

function PlayerScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const params = useParams();
  const filmId = Number(params?.id);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilmAction(filmId));
    }

    return () => {
      isMounted = false;
    };

  }, [filmId, dispatch]);

  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getIsFilmLoading);

  const {
    playerState,
    handlePlayButtonClick,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleFullScreenButtonClick,
    setFilmDuration
  } = useVideoPlayer(videoElement);

  if (!film) {
    return <NotFoundScreen></NotFoundScreen>;
  }

  if (isFilmLoading) {
    return <Spinner />;
  }

  return(
    <div className="player">
      <video
        data-testid="video"
        src={film.videoLink}
        ref={videoElement}
        className="player__video"
        onLoadedData={() => {
          if(videoElement.current !== null) {
            setFilmDuration(videoElement.current.duration);
          }
        }}
        onTimeUpdate={handleOnTimeUpdate}
        poster={film.backgroundImage}
      >
      </video>

      <button type="button" className="player__exit" data-testid="exit" onClick={() => navigate(`${AppRoute.Films}/${film.id}`)}>Exit</button>

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
              <button onClick={handlePlayButtonClick} type="button" className="player__play" data-testid="player-btn">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
            )}
          <div className="player__name">{film.name}</div>

          <button onClick={handleFullScreenButtonClick} type="button" className="player__full-screen" data-testid="fullscreen-btn">
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

