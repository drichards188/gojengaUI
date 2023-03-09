import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBankingUser,
  createDepositAsync,
  selectBalance,
  resetMessage,
  getUserAsync,
} from "../banking/bankingSlice";
import styles from "../banking/Banking.module.css";
import { Box, Grid, TextField } from "@mui/material";
import { BankComponents } from "../banking/Banking";

export function Deposit(props: any) {
  const bankingUser = useAppSelector(selectBankingUser);
  const balance = useAppSelector(selectBalance);
  const dispatch = useAppDispatch();
  const [amount, setStateAmount] = useState("0");
  const amountValue = Number(amount) || 0;

  let createDepositElem = (
    <Grid container className={styles.row}>
      <div>
        <TextField
          id="deposit-amount"
          label="Deposit Amount"
          variant="standard"
          type="number"
          inputMode="numeric"
          autoFocus={true}
          className={styles.textbox}
          aria-label="Deposit Amount"
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
        onClick={() => {
          const floatStr = parseFloat(amount);
          const newAmount: number = Number(balance) + Number(floatStr);
          const roundedNum =
            Math.round((newAmount + Number.EPSILON) * 100) / 100;
          dispatch(
            createDepositAsync({ account: bankingUser, amount: roundedNum })
          );
          // setStateAmount("0");
        }}
      >
        Deposit
      </button>
      <button
        className={styles.button}
        onClick={() => {
          props.setDisplayComponent(BankComponents.None);
          props.setDisplayToolbar(true);
          dispatch(getUserAsync({ username: bankingUser }));
          dispatch(resetMessage());
        }}
      >
        Back
      </button>
    </Grid>
  );

  return (
    <div>
      <div className={styles.row} id="welcomeDiv">
        {createDepositElem}
      </div>
    </div>
  );
}
