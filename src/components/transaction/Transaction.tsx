import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBankingUser,
  makeTransaction,
  createTransactionAsync,
  setMessage,
  selectToken,
} from "../banking/bankingSlice";
import styles from "../banking/Banking.module.css";
import { Box, Grid, TextField } from "@mui/material";
import { BankComponents } from "../banking/Banking";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function Transaction(props: any) {
  const bankingUser = useAppSelector(selectBankingUser);
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();
  const [destination, setDestination] = useState("");
  const [amount, setStateAmount] = useState("0");
  const amountValue = Number(amount) || 0;
  const formattedAmount: string = USDollar.format(amountValue);

  function createTransaction() {
    dispatch(makeTransaction({ destination, amount }));
    dispatch(
      createTransactionAsync({ bankingUser, destination, amount, jwt: token })
    );
    setDestination("");
    setStateAmount("");
  }

  const formatAmount = (amount: any) => {
    const cleanedString: string = amount.replace(/[^0-9.]/g, "");

    const numberValue: number = parseFloat(cleanedString);
    setStateAmount(String(numberValue));
  };

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
          inputMode="numeric"
          className={styles.textbox}
          aria-label="Pay Amount"
          value={formattedAmount}
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
          onChange={(e) => formatAmount(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={() => createTransaction()}>
        Pay
      </button>
      <button
        className={styles.button}
        onClick={() => {
          props.setDisplayComponent(BankComponents.None);
          props.setDisplayToolbar(true);
          dispatch(setMessage(""));
        }}
      >
        Back
      </button>
    </Grid>
  );
}
