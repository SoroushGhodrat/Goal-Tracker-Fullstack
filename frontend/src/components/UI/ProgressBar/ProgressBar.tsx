import styles from "./progressBar.module.css";

type ProgressBarProps = {
  goalStatus: [string, string, number, number | undefined];
};

const DEFAULT_COLOR = "#000000";

const HOURS_COLOR_RANGES = [
  { max: 6, color: "#D51011" },
  { max: 12, color: "#E2A537" },
  { max: 18, color: "#99CCFF" },
  { max: 24, color: "#339933" },
];

const DAY_COLOR_RANGES = [
  { max: 20, color: "#D51011" },
  { max: 40, color: "#E2A537" },
  { max: 60, color: "#99CCFF" },
  { max: 80, color: "#3399FF" },
  { max: 100, color: "#339933" },
];

const ProgressBar = ({ goalStatus }: ProgressBarProps) => {
  const [_startDate, _endDate, _remainDay, _hoursLeft] = goalStatus;

  const startDate = new Date(_startDate);
  const endDate = new Date(_endDate);
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  let progressBarColor, remainPercentage;

  if (_hoursLeft) {
    const remainHoursPercentage = parseFloat(
      ((_hoursLeft / 24) * 100).toFixed(2),
    );
    progressBarColor = (
      HOURS_COLOR_RANGES.find(
        (range) => remainHoursPercentage <= range.max,
      ) || { color: DEFAULT_COLOR }
    ).color;
    remainPercentage = remainHoursPercentage;
  } else {
    const remainDayPercentage = parseFloat(
      ((_remainDay / totalDays) * 100).toFixed(2),
    );
    progressBarColor = (
      DAY_COLOR_RANGES.find((range) => remainDayPercentage <= range.max) || {
        color: DEFAULT_COLOR,
      }
    ).color;
    remainPercentage = remainDayPercentage;
  }

  return (
    <div
      className={styles.progress_container}
      style={{
        background: `linear-gradient(to right, ${progressBarColor} ${remainPercentage}%, transparent ${remainPercentage}%)`,
      }}
      data-label={`${
        _remainDay > 0 ? `${_remainDay} days left` : `${_hoursLeft} hours left`
      }`}
    ></div>
  );
};

export default ProgressBar;
