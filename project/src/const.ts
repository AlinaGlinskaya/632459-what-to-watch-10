export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  AddReview = 'review',
  Player = '/player/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum TabName {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews'
}

export const FiltersList = {
  'All': 'All genres',
  'Comedy': 'Comedies',
  'Crime': 'Crime',
  'Documentary': 'Documentary',
  'Drama': 'Dramas',
  'Horror': 'Horror',
  'KidsAndFamily': 'Kids & Family',
  'Romance': 'Romance',
  'SciFi': 'Sci-Fi',
  'Thriller': 'Thrillers'
};
