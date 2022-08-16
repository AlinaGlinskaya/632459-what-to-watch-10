import {VideoPlayerProps} from '../../types/types';
import {useRef, useEffect} from 'react';


function VideoPlayer({src, poster, isPlaying}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.load();

  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      style={{
        position: 'relative',
        height: '100%',
        width: '280px',
      }}
    />
  );
}

export default VideoPlayer;
