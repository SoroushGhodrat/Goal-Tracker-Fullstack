import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant: 'button-solid' | 'button-outline' | 'button-text';
  size: 'small' | 'medium' | 'large';
  type: 'button' | 'submit' | 'reset';
  title: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  type = 'button',
  title,
  disabled = false,
}) => {
  const buttonClass = styles[variant];
  const sizeClass = styles[size];

  return (
    <button
      className={`${styles.button} ${buttonClass} ${sizeClass} `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
      {title}
    </button>
  );
};

export default Button;
