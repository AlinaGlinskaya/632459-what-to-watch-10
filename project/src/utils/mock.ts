import {Comment, CommentData, FilmMain, UserData} from '../types/types';
import {image, name, lorem, date, internet, random} from 'faker';
import {generateRandomInteger} from '../utils';

const colors = ['#ffffff', '#dedede', '#334482', '#090b16'];

const genres = ['Comedy', 'Crime', 'Documentary', 'Drama', 'Horror', 'KidsAndFamily', 'Romance', 'SciFi', 'Thriller', 'Detective'];

const randomDate = (start: Date, end: Date): number => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear();

const makeFakeFullname = () => `${name.firstName()} ${name.lastName()}`;

export const makeFakeFilm = (): FilmMain => ({
  id: generateRandomInteger(0, 500),
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: colors[generateRandomInteger(0, 3)],
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: Number(`${generateRandomInteger(0, 9)}.${generateRandomInteger(0, 9)}`),
  scoresCount: generateRandomInteger(0, 500),
  director: makeFakeFullname(),
  starring: Array.from({length: generateRandomInteger(1, 7)}, () => makeFakeFullname()),
  runTime: generateRandomInteger(1, 180),
  genre: genres[generateRandomInteger(0, genres.length - 1)],
  released: randomDate(new Date(1980, 0, 1), new Date()),
  isFavorite: Boolean(generateRandomInteger(0, 1))
} as FilmMain);

export const makeFakeComment = (): Comment => ({
  comment:  lorem.paragraph(),
  date: String(date.recent()),
  id: generateRandomInteger(0, 300),
  rating: Number(`${generateRandomInteger(0, 9)}.${generateRandomInteger(0, 9)}`),
  user: {
    id: generateRandomInteger(0, 300),
    name: makeFakeFullname(),
  }
} as Comment);

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: generateRandomInteger(0, 300),
  name: makeFakeFullname(),
  token: random.alphaNumeric(10),
} as UserData);

export const makeFakeCommentData = (): CommentData => ({
  comment:  lorem.paragraph(),
  rating: Number(`${generateRandomInteger(0, 9)}.${generateRandomInteger(0, 9)}`),
} as CommentData);
