export const dateStandardizer = (Selecteddate: Date) => {
  const date = new Date(Selecteddate);
  // console.log('selected date: ', date)
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

export const dayCalculator = (startDate: Date, endDate: Date) => {
  const _today = new Date();
  const _startDate = dateStandardizer(startDate);
  const _endDate = dateStandardizer(endDate);
  const _remainDay = goalDuration(startDate, endDate);
  const _isGoalExpired = new Date(endDate) > _today;
  const _isGoalFinishToday = _remainDay === 0 ? true : false;

  const _hoursLeft = _isGoalFinishToday
    ? (() => {
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        const diffInMilliseconds = midnight.getTime() - _today.getTime();
        const diffInHours = Math.round(diffInMilliseconds / (1000 * 60 * 60));

        return diffInHours;
      })()
    : undefined;

  return {
    _today: _today,
    _startDate: _startDate,
    _endDate: _endDate,
    _remainDay: _remainDay,
    _hoursLeft: _hoursLeft,
    _isGoalExpired: _isGoalExpired,
    _isGoalFinishToday: _isGoalFinishToday,
  };
};
