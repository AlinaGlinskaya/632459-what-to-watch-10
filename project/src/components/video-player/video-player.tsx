import {VideoPlayerProps} from '../../types/types';
import {useRef, useEffect} from 'react';
import './video-player.css';


function VideoPlayer({src, poster, isPlaying}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    if (isMounted) {
      videoRef.current.load();
    }

    return () => {
      isMounted = false;
    };

  }, [isPlaying]);

  return (
    <video className="video-preview"
      ref={videoRef}
      src={src}
      poster={poster}
      muted
    />
  );
}

export default VideoPlayer;
