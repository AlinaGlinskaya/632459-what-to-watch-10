import {AuthorizationStatus} from '../const';

export type FilmCardProps = {
  id: number,
  title: string,
  img: string,
  onMouseOver: () => void,
  isActive: boolean
}

export type AppScreenProps = {
  promoFilm: {
    img: string,
    alt: string,
    title: string,
    genre: string,
    year: number
  };
  films: FilmsMainProps
}

export type FilmsMainProps = {
  id: number,
  title: string,
  img: string,
  video: string
}[];

export type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element
}

export type FilmListProps = {
  id: number,
  title: string,
  img: string,
  video: string
}[];

