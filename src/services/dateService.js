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
  console.log(d);
  const today = new Date();
  const date = new Date(d);
  return compareAsc(date, today);
};