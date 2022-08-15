import {AuthorizationStatus} from '../const';
import {store} from '../store/index.js';

export type FilmCardProps = {
  film: FilmMain
}

export type AppScreenProps = {
  promoFilm: {
    id: number,
    img: string,
    alt: string,
    title: string,
    genre: string,
    year: number
  };
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
  src: string,
  posterImage: string,
  isPlaying: boolean
}

export type TabsProps = {
  film: FilmMain
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

export type CommentProps = {
  comment: Comment
}

export type SimilarFilmsProps = {
  films: FilmMain[],
  film: FilmMain
}

export type Genre = 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'KidsAndFamily' | 'Romance' | 'SciFi' | 'Thriller' | 'Detective'
| 'Adventure' | 'Action' | 'Fantasy';

export type InitialState = {
  activeFilter: string,
  films: FilmMain[],
  renderedFilmsCount: number,
  filteredFilms: FilmMain[],
  error: string | null,
  filters: (Genre | 'All')[]
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
