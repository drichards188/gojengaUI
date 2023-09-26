import React, { SetStateAction, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBankingUser,
  createDepositAsync,
  selectBalance,
  setMessage,
  getUserAsync,
  selectToken,
} from "../banking/bankingSlice";
import styles from "../banking/Banking.module.css";
// @ts-ignore
import NumberFormat from "react-number-format";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { BankComponents } from "../banking/Banking";
import CurrencyInput from "../general/CurrencyInput";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function Deposit(props: any) {
  const bankingUser = useAppSelector(selectBankingUser);
  const balance = useAppSelector(selectBalance);
  const jwtToken = useAppSelector(selectToken);

  const dispatch = useAppDispatch();
  const [amount, setStateAmount] = useState("0");
  const amountValue = Number(amount) || 0;
  const formattedAmount: string = USDollar.format(amountValue);

  const formatAmount = (amount: any) => {
    const cleanedString: string = amount.replace(/[^0-9.]/g, "");

    const numberValue: number = parseFloat(cleanedString);
    setStateAmount(String(numberValue));
  };

  // @ts-ignore
  let createDepositElem = (
    <Grid container className={styles.row}>
      <div>
        <TextField
          id="deposit-amount"
          label="Deposit Amount"
          variant="standard"
          inputMode="numeric"
          autoFocus={true}
          className={styles.textbox}
          aria-label="Deposit Amount"
          value={formattedAmount}
          // InputProps={{
          //   startAdornment: <span>$</span>, // you could also use the InputAdornment component from MUI here
          // }}
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
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            formatAmount(e.target.value)
          }
        />

        <CurrencyInput placeholder="$0.00" type="text" />
      </div>

      {/*<NumberFormat*/}
      {/*  customInput={TextField}*/}
      {/*  onValueChange={(values: any) => setStateAmount(values.value)}*/}
      {/*  value={amountValue}*/}
      {/*  // you can define additional custom props that are all forwarded to the customInput e. g.*/}
      {/*  variant="outlined"*/}
      {/*/>*/}

      <button
        className={styles.button}
        onClick={() => {
          const floatDepositAmount = parseFloat(amount);
          dispatch(
            createDepositAsync({
              account: bankingUser,
              amount: floatDepositAmount,
              jwt: jwtToken,
            })
          );
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
          dispatch(setMessage(""));
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
