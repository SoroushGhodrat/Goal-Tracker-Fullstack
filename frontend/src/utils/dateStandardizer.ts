export const dateStandardizer = (Selecteddate: Date) => {
  const date = new Date(Selecteddate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const day = date.getDate();

  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${monthString}-${dayString}-${year}`;
};

export const goalDuration = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = end.getTime() - start.getTime();
  const days = Math.round(duration / (1000 * 3600 * 24));
  return days;
};
