import {AuthorizationStatus} from '../const';
import {store} from '../store/index.js';
import {useDispatch} from 'react-redux';
import {AnyAction } from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {ReduxState} from '../store/index.js';

export type FilmCardProps = {
  film: FilmMain | null
}

export type FilmMain = {
  id: number
  name: string
  posterImage: string
  previewImage: string
  backgroundImage: string
  backgroundColor: string
  videoLink: string
  previewVideoLink: string
  description: string
  rating: number
  scoresCount: number
  director: string
  starring: string[]
  runTime: number
  genre: Genre
  released: number
  isFavorite: boolean
};

export type FilmsMainProps = {
  films: FilmMain[]
}

export type ShowMoreButtonProps = {
  films: FilmMain[],
  count: number
}

export type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element
}

export type VideoPlayerProps = {
  src?: string,
  poster?: string,
  isPlaying: boolean
}

export type Comment = {
  comment: string
    date: string
    id: number
    rating: number
    user: {
      id: number
      name: string
    }
}

export type CommentData = {
  comment: string,
  rating: number
}

export type CommentProps = {
  comment: Comment
}

export type CommentsProps = {
  comments: Comment[]
}

export type SimilarFilmsProps = {
  films: FilmMain[]
}

export type Genre = 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'KidsAndFamily' | 'Romance' | 'SciFi' | 'Thriller' | 'Detective'
| 'Adventure' | 'Action' | 'Fantasy';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
}

export type FilterProcess = {
  activeFilter: string,
  films: FilmMain[],
  filters: (Genre | 'All')[],
  renderedFilmsCount: number,
}

export type FavoriteProcess = {
  favoriteFilms: FilmMain[],
  films: FilmMain[]
}

export type FilmProcess = {
  isDataLoading: boolean,
  films: FilmMain[],
  promoFilm: FilmMain | null,
  film: FilmMain | null,
  similarFilms: FilmMain[],
  isServerAvailable: boolean,
  isFilmLoading: boolean
}

export type CommentProcess = {
  comments: Comment[],
  isPosting: boolean
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  avatarUrl: string
  email: string
  id: number
  name: string
  token: string
}

export type UserBlockProps = {
  avatarUrl?: string,
}

export type FavoriteData = {
  filmId: number | undefined,
  status: number
}

export type VideoRef = {
  requestFullscreen: () => void;
  pause: () => void;
  play: () => void;
  currentTime: number;
  duration: number;
}

export type TypedDispatch = ThunkDispatch<ReduxState, AxiosInstance, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
