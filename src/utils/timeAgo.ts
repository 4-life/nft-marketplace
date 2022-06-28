import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

export default function getTimeAgo(date: Date, short = true): string {
  const time = timeAgo.format(date, short ? 'mini-now' : undefined);

  if (Array.isArray(time)) {
    return time[0];
  }

  return time;
}
