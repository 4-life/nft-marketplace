import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

export default function getTimeAgo(date: string, short = true): string {
  const time = timeAgo.format(new Date(date), short ? 'mini-now' : undefined);

  if (Array.isArray(time)) {
    return time[0];
  }

  return time;
}
