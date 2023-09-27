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
import { NumericFormat } from "react-number-format";
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
  const [amount, setStateAmount] = useState(0);
  const [numberValue, setNumberValue] = useState(0);
  const amountValue = Number(amount) || 0;

  // @ts-ignore
  let createDepositElem = (
    <Grid container className={styles.row}>
      <div>
        {/*<TextField*/}
        {/*  id="deposit-amount"*/}
        {/*  label="Deposit Amount"*/}
        {/*  variant="standard"*/}
        {/*  inputMode="numeric"*/}
        {/*  autoFocus={true}*/}
        {/*  className={styles.textbox}*/}
        {/*  aria-label="Deposit Amount"*/}
        {/*  value={formattedAmount}*/}
        {/*  // InputProps={{*/}
        {/*  //   startAdornment: <span>$</span>, // you could also use the InputAdornment component from MUI here*/}
        {/*  // }}*/}
        {/*  sx={{*/}
        {/*    "& .MuiInputBase-root": {*/}
        {/*      color: "primary.main",*/}
        {/*    },*/}
        {/*    "& .MuiFormLabel-root": {*/}
        {/*      color: "secondary.main",*/}
        {/*    },*/}
        {/*    "& .MuiFormLabel-root.Mui-focused": {*/}
        {/*      color: "primary.main",*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  onChange={(e: { target: { value: React.SetStateAction<string> } }) =>*/}
        {/*    formatAmount(e.target.value)*/}
        {/*  }*/}
        {/*/>*/}

        <NumericFormat
          prefix={"$"}
          defaultValue={0}
          thousandSeparator={true}
          value={numberValue}
          allowNegative={false}
          decimalScale={2}
          customInput={CurrencyInput}
          onValueChange={(v: any) => {
            setNumberValue(v.value);
          }}
          valueCallback={setNumberValue}
        />
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
          dispatch(
            createDepositAsync({
              account: bankingUser,
              amount: numberValue,
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
