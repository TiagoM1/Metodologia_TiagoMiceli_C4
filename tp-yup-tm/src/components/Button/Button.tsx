import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', disabled = false, children }) => {
  return (
    <button type={type} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;