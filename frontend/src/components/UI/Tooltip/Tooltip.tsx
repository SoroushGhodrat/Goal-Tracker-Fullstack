import styles from "./tooltip.module.css";

interface TooltipProps {
  title: string;
  textColor: string;
  backgroundColor: string;
  children: React.ReactNode;
}

const Tooltip = ({
  title,
  textColor,
  backgroundColor,
  children,
}: TooltipProps) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span
        className={styles.tooltiptext}
        style={{ color: textColor, background: backgroundColor }}
      >
        {title}
      </span>
    </div>
  );
};

export default Tooltip;
