import React, { SetStateAction, useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBankingUser,
  createDepositAsync,
  selectBalance,
  setMessage,
  getUserAsync,
  selectToken,
  selectUpdate,
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
import { BankComponents } from "../views/Banking";
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
  const hasUpdate = useAppSelector(selectUpdate);
  const dispatch = useAppDispatch();
  const [numberValue, setNumberValue] = useState("");

  useEffect(() => {
    if (hasUpdate) {
      dispatch(getUserAsync({ username: bankingUser, jwt: jwtToken }));
    }
  }, [hasUpdate]);

  function setValue(value: string) {
    // alert(`value: ${value}`);
    value = value.replace(/[$,]/g, "");
    // alert(`removed symbols ${value}`);
    // Remove leading zeroes
    value = value.replace(/^0+/, "");
    // alert(`removed leading zeroes ${value}`);

    setNumberValue(value);
  }

  let createDepositElem = (
    <Grid container className={styles.row}>
      <div>
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
          autofocus={true}
        />
      </div>

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
