import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeCoinFromDisplayList } from "./dashboardSlice";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "../banking/Banking.module.css";

const Card = (props: any) => {
  let { id, last, volume } = props.data;

  const dispatch = useAppDispatch();

  const [tradeAmount, setTradeAmount] = useState("0");

  last = last.toFixed(4);
  volume = volume.toFixed(2);

  const divStyle = {
    display: "inline-block",
    marginRight: "25px",
    padding: "10px",
    backgroundColor: "#363940",
    color: "#BA79F7",
    boxShadow:
      "0px 3px 1px -2px rgba(112,76,182),0px 2px 2px 0px rgba(112,76,182,0.9),0px 1px 5px 0px rgba(82,0,130,0.12)",
  };

  const closeCardStyle = {
    display: "block",
    marginLeft: "10px",
    fontStyle: "normal",
    color: "#BA79F7",
    width: "16px",
    height: "16px",
    cursor: "pointer",
  };

  return (
    <Grid
      container
      spacing={1}
      style={divStyle}
      md={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={2}>
        <p
          style={closeCardStyle}
          onClick={() => {
            dispatch(removeCoinFromDisplayList(id));
          }}
        >
          X
        </p>
      </Grid>

      <Grid item md={12}>
        <p>{id}</p>
        <p>${last}</p>
        <p>{volume}</p>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        md={12}
      >
        <Grid item md={12}>
          <TextField
            id="deposit-amount"
            label="Trade Amount"
            variant="standard"
            type="number"
            inputMode="numeric"
            autoFocus={true}
            className={styles.textbox}
            aria-label="Trade Amount"
            value={tradeAmount}
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
            onChange={(e) => setTradeAmount(e.target.value)}
          />
        </Grid>

        <Grid item md={4}>
          <Button onClick={() => alertTradeAmount(tradeAmount)}>Buy</Button>
        </Grid>

        <Grid item md={4}>
          <Button onClick={() => alertTradeAmount(tradeAmount)}>Sell</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

function alertTradeAmount(tradeAmount: string) {
  alert(tradeAmount);
}

export default Card;
