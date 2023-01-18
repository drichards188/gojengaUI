import { Box } from "@mui/material";
import styles from "../Banking.module.css";
import React from "react";

const AccountBalance = ({ bankingUser, balance, serverMessage }: any) => {
  return (
    <div>
      <Box className={styles.textbox} aria-label="Set User">
        {"Hi " + bankingUser + "!"}
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

export default AccountBalance;
