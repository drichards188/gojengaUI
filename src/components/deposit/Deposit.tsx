import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBankingUser,
  createDepositAsync,
  selectBalance,
} from "../banking/bankingSlice";
import styles from "../banking/Banking.module.css";
import { Box, Grid, TextField } from "@mui/material";

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
          dispatch(
            createDepositAsync({ account: bankingUser, amount: newAmount })
          );
          // setStateAmount("0");
        }}
      >
        Deposit
      </button>
      <button
        className={styles.button}
        onClick={() =>
          props.closeDepositCreation(
            props.setDisplay,
            props.setDepositCreation,
            dispatch
          )
        }
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
