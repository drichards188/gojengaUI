import styles from "../Banking.module.css";
import { Box, Container } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";

const BankingToolbar = (props: any) => {
  const dispatch = useAppDispatch();

  return (
    <Container className={styles.row}>
      <Box>
        <button
          className={styles.button}
          onClick={() =>
            props.openDepositCreation(
              props.setDisplay,
              props.setDepositCreation
            )
          }
        >
          Deposit
        </button>
        <button
          className={styles.button}
          onClick={() =>
            props.openTransactionCreation(
              props.setDisplay,
              props.setTransactionCreation
            )
          }
        >
          Pay
        </button>
        <button
          className={styles.button}
          onClick={() =>
            props.openInfoCreation(
              props.setDisplay,
              props.setInfoCreation,
              dispatch,
              props.username
            )
          }
        >
          Account
        </button>
      </Box>
    </Container>
  );
};

export default BankingToolbar;
