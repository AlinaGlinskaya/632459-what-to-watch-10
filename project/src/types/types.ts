export type FilmCardProps = {
  title: string,
  img: string,
}

export type FilmsList = {
  id: number,
  title: string,
  img: string,
}[];

export type AppScreenProps = {
  promoFilm: {
    img: string,
    alt: string,
    title: string,
    genre: string,
    year: number
  }
  films: {
    id: number,
    title: string,
    img: string,
  }[];
}

export type FilmsMainProps = {
  films: {
    id: number,
    title: string,
    img: string,
  }[];
}

