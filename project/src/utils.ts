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

