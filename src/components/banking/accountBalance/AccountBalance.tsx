import { Box } from "@mui/material";
import styles from "../Banking.module.css";
import React from "react";

const AccountBalance = ({ bankingUser, balance, serverMessage }: any) => {
  return (
    <div>
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
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default AccountBalance;
