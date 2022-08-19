import {AuthorizationStatus} from '../const';
import {store} from '../store/index.js';

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
  rating: number,
  filmId: number
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

export type InitialState = {
  activeFilter: string,
  films: FilmMain[],
  renderedFilmsCount: number,
  filteredFilms: FilmMain[],
  isDataLoading: boolean,
  error: string | null,
  filters: (Genre | 'All')[],
  promoFilm: FilmMain | null,
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
  film: FilmMain | null,
  similarFilms: FilmMain[],
  comments: Comment[]
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
