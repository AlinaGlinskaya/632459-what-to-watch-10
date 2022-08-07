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

export enum Filters {
  All = 'all genres',
  Comedies = 'comedies',
  Crime = 'crime',
  Documentary = 'documentary',
  Dramas = 'dramas',
  Horror = 'horror',
  Family = 'family',
  Romance = 'romance',
  SciFi = 'sci-fi',
  Thrillers = 'thrillers'
}
