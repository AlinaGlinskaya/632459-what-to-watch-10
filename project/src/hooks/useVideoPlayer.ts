import {useState, useEffect} from 'react';
import {ChangeEvent} from 'react';
import {getVideoDurationFormat} from '../utils';
import {VideoRef} from '../types/types';

const useVideoPlayer = (videoElement: React.MutableRefObject<HTMLVideoElement | null | VideoRef>) => {

  const MAX_PROGRESS = 100;

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    duration: ''
  });

  const handlePlayButtonClick = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const handleFullScreenButtonClick = () => {
    videoElement?.current?.requestFullscreen();
  };

  const setFilmDuration = (duration: number) => {
    setPlayerState({
      ...playerState,
      duration: getVideoDurationFormat(duration),
    });

  };

  const handleOnTimeUpdate = () => {

    if (videoElement.current === null) {
      return;
    }

    const progress = (videoElement.current.currentTime / videoElement.current.duration) * MAX_PROGRESS;
    const progressTime = Number(videoElement.current?.duration) - Number(videoElement.current.currentTime);
    if (progress < MAX_PROGRESS) {
      return setPlayerState({
        ...playerState,
        progress,
        duration: getVideoDurationFormat(progressTime),
      });
    }
    setPlayerState({
      ...playerState,
      progress: MAX_PROGRESS,
      isPlaying: false
    });
  };

  const handleVideoProgress = (evt: ChangeEvent<HTMLInputElement> | null) => {

    if (videoElement.current === null || evt === null) {
      return;
    }

    const manualChange = Number(evt.target.value);

    videoElement.current.currentTime = (videoElement.current.duration / MAX_PROGRESS) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  useEffect(() => {

    let isMounted = true;

    if (videoElement.current === null) {
      return;
    }

    if (isMounted) {
      playerState.isPlaying
        ? videoElement.current.play()
        : videoElement.current.pause();
    }

    return () => {
      isMounted = false;
    };


  }, [playerState.isPlaying, videoElement]);

  return {
    playerState,
    handlePlayButtonClick,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleFullScreenButtonClick,
    setFilmDuration
  };
};

export default useVideoPlayer;
