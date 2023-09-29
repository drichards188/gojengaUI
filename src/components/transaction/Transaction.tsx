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
import CurrencyInput from "../general/CurrencyInput";
import { NumericFormat } from "react-number-format";

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
  const [numberValue, setNumberValue] = useState("");

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

  function setValue(value: string) {
    // alert(`value: ${value}`);
    value = value.replace(/[$,]/g, "");
    // alert(`removed symbols ${value}`);
    // Remove leading zeroes
    value = value.replace(/^0+/, "");
    // alert(`removed leading zeroes ${value}`);

    setNumberValue(value);
  }

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

        <NumericFormat
          prefix={"$"}
          thousandSeparator={true}
          value={numberValue}
          allowNegative={false}
          allowLeadingZeros={false}
          valueIsNumericString={true}
          decimalScale={2}
          customInput={CurrencyInput}
          valueCallback={setValue}
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
