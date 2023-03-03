import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createUser,
  createUserAsync,
  selectBanking,
  selectBankingUser,
  makeTransaction,
  createTransactionAsync,
} from "../banking/bankingSlice";
import styles from "../banking/Banking.module.css";
import { Box, Grid, TextField } from "@mui/material";

export function Transaction(props: any) {
  const banking = useAppSelector(selectBanking);
  const bankingUser = useAppSelector(selectBankingUser);
  const dispatch = useAppDispatch();
  const [amount, setStateAmount] = useState("0");
  const [destination, setDestination] = useState("");
  const amountValue = Number(amount) || 0;

  return (
    <Grid container className={styles.row}>
      <div>
        <TextField
          id="destination"
          label="Destination"
          variant="standard"
          className={styles.textbox}
          autoFocus={true}
          aria-label="Set User"
          placeholder={"Destination Username"}
          value={destination}
          sx={{
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
            "& .MuiFormLabel-root": {
              color: "secondary.main",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextField
          id="payment-amount"
          label="Payment Amount"
          variant="standard"
          type="number"
          inputMode="numeric"
          className={styles.textbox}
          aria-label="Pay Amount"
          value={amountValue}
          sx={{
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
            "& .MuiFormLabel-root": {
              color: "secondary.main",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
          onChange={(e) => setStateAmount(e.target.value)}
        />
      </div>
      <button
        className={styles.button}
        onClick={() =>
          createTransaction(
            dispatch,
            bankingUser,
            destination,
            amount,
            setDestination,
            setStateAmount
          )
        }
      >
        Pay
      </button>
      <button
        className={styles.button}
        onClick={() =>
          props.closeTransactionCreation(
            props.setDisplay,
            props.setTransactionCreation,
            dispatch
          )
        }
      >
        Back
      </button>
    </Grid>
  );
}

function createTransaction(
  dispatch: any,
  account: string,
  destination: string,
  amount: string,
  setDestination: any,
  setStateAmount: any
) {
  dispatch(makeTransaction({ destination, amount }));
  dispatch(createTransactionAsync({ account, destination, amount }));
  setDestination("");
  setStateAmount("");
}
