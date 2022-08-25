import {FilmMain} from './types/types';
import {FiltersList} from './const';
import {FILTER_DEFAULT} from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


export const getTimeFromMins = (mins?: number) => {
  if (mins) {
    const runtime = dayjs.duration(mins, 'minutes');
    return runtime.hours() !== 0 ? `${runtime.hours()}h ${runtime.minutes()}m` : `${runtime.minutes()}m`;
  }

  return null;
};

export const getDatetimeFormat = (date: string) => dayjs(date).format('YYYY-MM-DD');

export const getDateCommentFormat = (date: string) => dayjs(date).format('MMMM DD, YYYY');

export const getRatingFormat = (rating: number) => {
  const rate = rating.toFixed(1);
  return rate.replace('.', ',');
};

export const getVideoDurationFormat = (time?: number | undefined) => {
  if (time) {
    const runtime = dayjs.duration(time);
    return runtime.hours() !== 0 ? `${runtime.hours()}:${runtime.minutes()}` : `${runtime.minutes()}:${runtime.seconds()}`;
  }
};


export const setFilters = (films: FilmMain[]) => {
  const genres: (keyof typeof FiltersList)[] = [FILTER_DEFAULT];
  films.map((item: FilmMain) => genres.push(item.genre));
  const filters = [...new Set(genres)];
  return filters;
};

