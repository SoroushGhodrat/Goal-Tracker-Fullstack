export const hoursIn24Format = () => {
  const today = new Date();
  const currentHours = today.getHours();
  const currentMinutes = today.getMinutes();

  const currentTime = `${
    currentHours < 10 ? '0' + currentHours : currentHours
  }:${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}`;
  return currentTime;
};

export const dateStandardizer = (Selecteddate: Date) => {
  const date = new Date(Selecteddate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const day = date.getDate();

  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${monthString}-${dayString}-${year}`;
};

export const goalRemainDay = (endDate: Date) => {
  const today = new Date();
  const end = new Date(endDate);
  const duration = end.getTime() - today.getTime();
  const days = Math.ceil(duration / (1000 * 3600 * 24));
  return days;
};

export const dayCalculator = (startDate: Date, endDate: Date) => {
  const _today = new Date();
  const _startDate = dateStandardizer(startDate);
  const _endDate = dateStandardizer(endDate);
  const _remainDay = goalRemainDay(endDate);
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
