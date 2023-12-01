import { Box } from "@mui/material";
import styles from "../Banking.module.css";
import React from "react";
import { paperStyle } from "../../views/Banking";

const AccountBalance = ({ bankingUser, balance, serverMessage }: any) => {
  return (
    <div style={paperStyle}>
      <Box className={styles.textbox} aria-label="Set User">
        {"Hi " + capitalized(bankingUser) + "!"}
      </Box>
      <Box className={styles.textbox} aria-label="Set User">
        {"You have $" + balance}
      </Box>
      <Box className={styles.textbox} aria-label="Set User">
        {serverMessage}
      </Box>
    </div>
  );
};

const capitalized = (str: string) => {
  if (str === null || str === undefined) {
    str = "0.00";
  }
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default AccountBalance;
