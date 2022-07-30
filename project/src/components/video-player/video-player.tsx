import {VideoPlayerProps} from '../../types/types';
import {useRef, useEffect, useState} from 'react';

function VideoPlayer({src, posterImage}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let timeout: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();

  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      onMouseEnter={() =>
      {
        timeout = setTimeout(() => setIsPlaying(true), 1000);
      }}
      onMouseLeave={() => {
        if (!isPlaying) {
          clearTimeout(timeout);
        }
        setIsPlaying(false);
      }}
      src={src}
      poster={posterImage}
      muted
      style={{
        height: '100%',
        width: '280px',
      }}
    />
  );
}

export default VideoPlayer;
