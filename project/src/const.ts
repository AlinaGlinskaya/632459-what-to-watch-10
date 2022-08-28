import {Genre} from './types/types';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  AddReview = 'review',
  Player = '/player/',
  Favorite = '/favorite'
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

export enum FilmLevel {
  Bad = 3,
  Normal = 5,
  Good = 8,
  Awesome = 10
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum NameSpace {
  Film = 'FILM',
  User = 'USER',
  Filter = 'FILTER',
  Comment = 'COMMENT',
  Favorite= 'FAVORITE'
}

export const FiltersList: Record<Genre | 'All', string> = {
  'All': 'All genres',
  'Comedy': 'Comedies',
  'Crime': 'Crime',
  'Documentary': 'Documentary',
  'Drama': 'Dramas',
  'Horror': 'Horror',
  'KidsAndFamily': 'Kids & Family',
  'Romance': 'Romance',
  'SciFi': 'Sci-Fi',
  'Thriller': 'Thrillers',
  'Detective': 'Detective',
  'Adventure': 'Adventures',
  'Action' : 'Action',
  'Fantasy': 'Fantasy'
};

export const FILTER_DEFAULT = 'All';

export enum ReviewLimit {
  MinLength = 50,
  MaxLength = 400,
}


