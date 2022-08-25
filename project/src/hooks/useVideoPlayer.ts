import {useState, useEffect, RefObject} from 'react';
import {ChangeEvent} from 'react';
import { getVideoDurationFormat } from '../utils';

const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>) => {
  const filmDuration = getVideoDurationFormat(videoElement.current?.duration);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    duration: filmDuration
  });

  const handlePlayButtonClick = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const handleFullScreenButtonClick = () => {
    videoElement.current?.requestFullscreen();
  };

  const handleOnTimeUpdate = () => {

    if (videoElement.current === null) {
      return;
    }

    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (evt: ChangeEvent<HTMLInputElement> | null) => {

    if (videoElement.current === null || evt === null) {
      return;
    }

    const manualChange = Number(evt.target.value);

    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  useEffect(() => {

    if (videoElement.current === null) {
      return;
    }

    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  return {
    playerState,
    handlePlayButtonClick,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleFullScreenButtonClick
  };
};

export default useVideoPlayer;
