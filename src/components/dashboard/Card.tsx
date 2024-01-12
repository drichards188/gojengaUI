import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPortfolio,
  removeCoinFromDisplayList,
  selectCoinDisplayList,
} from "./dashboardSlice";
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
import { selectBankingUser, selectToken } from "../banking/bankingSlice";
import { updatePortfolio } from "./dashboardAPI";
import { getAccessToken } from "../banking/bankingAPI";
import TradingViewWidget from "../risk/TradingViewChart";

const Card = (props: any) => {
  let { id, last, volume } = props.data;

  const displayCoinData = useAppSelector(selectCoinDisplayList);

  const [tradeAmount, setTradeAmount] = useState(0);
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectBankingUser);
  const token = getAccessToken();

  // last = last.toFixed(4);
  volume = volume.toFixed(2);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (id in displayCoinData) {
      const newTradeAmount = displayCoinData[id].quantity;
      setTradeAmount(newTradeAmount);
    }
  }, [displayCoinData]);

  const divStyle = {
    display: "inline-block",
    margin: "2%",
    width: "100%",
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
      sm={4}
      md={4}
      lg={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={2}>
        <a
          style={closeCardStyle}
          onClick={() => {
            dispatch(removeCoinFromDisplayList(id));
          }}
        >
          X
        </a>
      </Grid>

      <Grid item md={12}>
        <p>{id}</p>
        <p>{USDollar.format(last)}</p>
        <p>
          Volume <br />
          {volume}
        </p>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        md={12}
      >
        <Grid item md={10}>
          <TextField
            id="deposit-amount"
            label="Trade Amount"
            variant="standard"
            type="number"
            inputMode="numeric"
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
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTradeAmount(value);
            }}
          />
        </Grid>

        <Grid item md={4}>
          <Button
            onClick={() =>
              triggerPortfolioUpdate(
                "buy",
                currentUser,
                id,
                id,
                tradeAmount,
                token,
                dispatch
              )
            }
          >
            Buy
          </Button>
        </Grid>

        <Grid item md={4}>
          <Button
            onClick={() =>
              triggerPortfolioUpdate(
                "sell",
                currentUser,
                id,
                id,
                tradeAmount,
                token,
                dispatch
              )
            }
          >
            Sell
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

async function triggerPortfolioUpdate(
  updateType: string,
  currentUser: string,
  coinName: string,
  coinId: string,
  quantity: number,
  token: string,
  dispatch: any
) {
  quantity = parseInt(String(quantity));
  let resp = await updatePortfolio(
    {
      orderType: updateType,
      amount: quantity,
      asset: coinId,
    },
    token
  );
  dispatch(getPortfolio({ user: currentUser, jwt: token }));
  // alert(JSON.stringify(resp));
}

export default Card;
