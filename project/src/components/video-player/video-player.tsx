import {VideoPlayerProps} from '../../types/types';
import {useRef, useEffect} from 'react';
import './video-player.css';


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
    <video className="video-preview"
      ref={videoRef}
      src={src}
      poster={poster}
      muted
    />
  );
}

export default VideoPlayer;
