import styles from "../banking/Banking.module.css";
import React from "react";
import { TextField } from "@mui/material";

const CurrencyInput = (props: any) => {
  // alert(JSON.stringify(props));

  const [formattedAmount, setFormattedAmount] = React.useState("");

  return (
    <TextField
      id="deposit-amount"
      label="Deposit Amount"
      type={props.type}
      variant="standard"
      inputMode={props.inputMode}
      autoFocus={true}
      className={styles.textbox}
      aria-label="Deposit Amount"
      value={props.value}
      onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
        props.valueCallback(e.target.value);
      }}
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
    />
  );
};

export default CurrencyInput;