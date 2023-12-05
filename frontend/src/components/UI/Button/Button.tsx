import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "text" | "contained" | "outlined" | "disabled";
  size: "small" | "medium" | "large";
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  type = "button",
}) => {
  const buttonClass = styles[variant];
  const sizeClass = styles[size];

  return (
    <button
      className={`${styles.button} ${buttonClass} ${sizeClass} `}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
