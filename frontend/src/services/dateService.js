export const isSameDate = (date1, date2) => {
  const date1Str = new Date(date1).toDateString();
  const date2Str = new Date(date2).toDateString();
  return date1Str === date2Str;
};

const timeFormat = new Intl.DateTimeFormat("default", {
  hour: "numeric",
  minute: "numeric",
  hour12: false
});

export const dateToLocaleTimeString = (dateString) => {
  if (dateString) {
    return timeFormat.format(dateString);
  }
  return dateString;
};

const dateFormat = new Intl.DateTimeFormat("default", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric"
});

export const dateToLocaleDateString = (dateString) => {
  if (dateString) {
    return dateFormat.format(dateString);
  }
  return dateString;
};