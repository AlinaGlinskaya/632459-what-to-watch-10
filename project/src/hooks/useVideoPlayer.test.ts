import {renderHook} from '@testing-library/react';
import useVideoPlayer from './useVideoPlayer';
import type {VideoRef} from '../types/types';
import { act } from 'react-dom/test-utils';

const videoElement: VideoRef = {
  currentTime: 30,
  duration: 60,
  pause: jest.fn(),
  play: jest.fn(),
  requestFullscreen: jest.fn(),
};

const ref: React.MutableRefObject<VideoRef | null> = { current: videoElement};

describe('Hook: useVideoPlayer', () => {

  it('should toggle "isPlaying" state', () => {
    const {result} = renderHook(() =>
      useVideoPlayer(ref),
    );

    act(() => {
      result.current.handlePlayButtonClick();
    });

    expect(result.current.playerState.isPlaying).toBeTruthy();
  });

  it('should call expand video to fullscreen', () => {
    const {result} = renderHook(() =>
      useVideoPlayer(ref),
    );

    act(() => {
      result.current.handleFullScreenButtonClick();
    });

    expect(ref.current?.requestFullscreen).toBeCalled();
  });

  it('should update time while video is playing', () => {

    const {result} = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.currentTime = 20;
      ref.current.duration = 40;
    }

    act(() => {
      result.current.handleOnTimeUpdate();
    });

    expect(result.current.playerState.duration).toBe('00:20');
  });

  it('should set film duration when film is loaded', () => {

    const {result} = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.duration = 180;
    }

    const duration = ref.current?.duration;

    act(() => {
      if (duration) {
        result.current.setFilmDuration(duration);
      }
    });
    expect(result.current.playerState.duration).toBe('03:00');
  });

  it('should update video progress when video is playing', () => {

    const {result} = renderHook(() =>
      useVideoPlayer(ref),
    );
    if (ref.current) {
      ref.current.currentTime = 50;
      ref.current.duration = 100;
    }

    act(() => {
      result.current.handleVideoProgress({target: {value: '50'}} as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.playerState.progress).toBe(50);
  });
});
