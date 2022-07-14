export type FilmCardProps = {
  title: string,
  img: string,
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
}[];

