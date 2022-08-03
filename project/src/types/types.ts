import {AuthorizationStatus} from '../const';

export type FilmCardProps = {
  id: number,
  title: string,
  img: string,
  previewVideoLink: string,
  posterImage: string
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
  films: FilmMain[]
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
  genre: string
  released: number
  isFavorite: boolean
};

export type FilmsMainProps = {
  films: FilmMain[]
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

export type CommentProps = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
}

export type FilmCommentsProps = {
  comments: CommentProps[]
}

export type SimilarFilmsProps = {
  films: FilmMain[],
  film: FilmMain
}

