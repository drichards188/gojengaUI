import styles from "../banking/Banking.module.css";
import { BankComponents } from "../views/Banking";
import React from "react";

interface CustomButtonProps {
  label: string;
  clickFunction(): any;
}
const CustomButton = ({ label, clickFunction }: CustomButtonProps) => {
  return (
    <button className={styles.button} onClick={clickFunction}>
      {label}
    </button>
  );
};

export default CustomButton;
