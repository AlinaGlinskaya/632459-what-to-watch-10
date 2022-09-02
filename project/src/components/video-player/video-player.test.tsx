import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import VideoPlayer from './video-player';

const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: Video player', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <VideoPlayer
          isPlaying={false}
          src={'mock-path'}
          poster={'mock-path'}
        />
      </Provider>
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
