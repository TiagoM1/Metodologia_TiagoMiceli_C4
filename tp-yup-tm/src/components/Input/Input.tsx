import React from "react";
import styles from "../Input/Input.module.css";

interface InputProps {
  label: string;
  name: string;
  value: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, type, handleChange, error }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
      />
      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : (
        <p className={styles.errorText} style={{ visibility: "hidden" }}>
          &nbsp;
        </p>
      )}
    </div>
  );
};

export default Input;
