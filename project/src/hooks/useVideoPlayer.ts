import {useState, useEffect, RefObject} from 'react';

const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
  });

  const togglePlaying = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
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
    togglePlaying,
  };
};

export default useVideoPlayer;
