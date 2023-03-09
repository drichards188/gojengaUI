import styles from "../Banking.module.css";
import { Box, Container } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectBankingUser } from "../bankingSlice";
import { BankComponents } from "../Banking";

const BankingToolbar = (props: any) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectBankingUser);

  return (
    <Container className={styles.row}>
      <Box>
        <button
          className={styles.button}
          onClick={() => {
            props.setDisplayComponent(BankComponents.Deposit);
            props.setDisplayToolbar(false);
          }}
        >
          Deposit
        </button>
        <button
          className={styles.button}
          onClick={() => {
            props.setDisplayComponent(BankComponents.Transaction);
            props.setDisplayToolbar(false);
          }}
        >
          Pay
        </button>
        <button
          className={styles.button}
          onClick={() => {
            props.setDisplayComponent(BankComponents.Info);
            props.setDisplayToolbar(false);
          }}
        >
          Account
        </button>
      </Box>
    </Container>
  );
};

export default BankingToolbar;
