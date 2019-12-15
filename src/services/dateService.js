import { getMonth, getDate, compareAsc } from 'date-fns';

export const monthNames =[
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  "May",
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

export let getDayMonth;
getDayMonth = (date) => {
  const month = getMonth(new Date(date));
  const day = getDate(new Date(date));
  const name = monthNames[month];
  return `${day} ${name}`
};

export const compareWithToday = (d) => {
  const today = new Date().setHours(0,0,0,0);
  const date = new Date(d).setHours(0,0,0,0);
  return compareAsc(date, today);
};

export const isEqualDay = (d1, d2) => {
  const date1 = new Date(d1).setHours(0,0,0,0);
  const date2 = new Date(d2).setHours(0,0,0,0);
  return compareAsc(date1, date2) === 0;
};